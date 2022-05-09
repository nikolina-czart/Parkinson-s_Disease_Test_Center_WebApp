import React, { useEffect, useState } from "react";
import Navbar from "../../layout/Navbar";
import firebase from "../../../config/fbConfig";
import PatientTestSelector from "./PatientTestSelector";
import PatientDataCheckbox from "./PatientDataCheckbox";
import PatientButton from "./PatientButton";
import PatientChart from "./PatientChart";
import { TESTS } from "../../parkinsonTests/parkinsonTests";

const PatientDetails = ({ location }) => {
  const id = location.state;
  const db = firebase.firestore();
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState();
  const [fullDates, setFullDates] = useState([]);
  const [name, setName] = useState("");
  const [xaxisTitle, setXaxisTitle] = useState("");
  const [yaxisTitle, setYaxisTitle] = useState("");

  useEffect(() => {
    if (id && db) {
      db.collection("users")
        .doc(id)
        .collection("tests")
        .get()
        .then((querySnapshot) => {
          const testData = [];
          querySnapshot.forEach((doc) => {
            console.log("test: ", doc.id);
            testData.push({ ...doc.data(), id: doc.id });
          });
          setTests(testData);
        });

      db.collection("users")
        .doc(id)
        .collection("testsHistory")
        .get()
        .then((querySnapshot) => {
          const testData = [];
          querySnapshot.forEach((doc) => {
            console.log("testsHistory: ", doc.id);
          });
        });

      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id === id) {
              setName(doc.data().email.split("@")[0]);
            }
          });
        });
    }
  }, [id, db]);

  useEffect(() => {
    if (tests.length > 0) {
      setSelectedTest(tests[0]);
    }
  }, [tests]);

  useEffect(() => {
    if (id && db && selectedTest) {
      TESTS.filter((test) => test.id === selectedTest.id).forEach((test) => {
        setXaxisTitle(test.xaxis);
        setYaxisTitle(test.yaxis);
      });

      setFullDates([]);

      db.collection("users")
        .doc(id)
        .collection("testsHistory")
        .doc(selectedTest.id)
        .collection("testDates")
        .get()
        .then((querySnapshot) => {
          const dates = [];

          querySnapshot.forEach((doc) => {
            dates.push({
              ...doc.data(),
              id: doc.id,
              checked: false,
              otherRight: [],
              otherLeft: [],
            });
          });
          dates.forEach((date) => {
            const leftPromise = db
              .collection("users")
              .doc(id)
              .collection("testsHistory")
              .doc(selectedTest.id)
              .collection("testDates")
              .doc(date.id)
              .collection("LEFT")
              .get();

            const rightPromise = db
              .collection("users")
              .doc(id)
              .collection("testsHistory")
              .doc(selectedTest.id)
              .collection("testDates")
              .doc(date.id)
              .collection("RIGHT")
              .get();

            Promise.all([leftPromise, rightPromise]).then((querySnapshots) => {
              const leftQuerySnapshot = querySnapshots[0];
              const rightQuerySnapshot = querySnapshots[1];

              leftQuerySnapshot.forEach((doc) => {
                const data = doc.data();
                const array = data.accel ? data.accel : data.test;
                array?.shift();
                date.left = array;

                if (selectedTest.id === "FINGER_TAPPING") {
                  date.otherLeft = data.data;
                } else if (selectedTest.id === "TOE_TAPPING") {
                  date.otherLeft = data.a;
                }
              });

              rightQuerySnapshot.forEach((doc) => {
                const data = doc.data();
                const array = data.accel ? data.accel : data.test;
                array?.shift();
                date.right = array;

                if (selectedTest.id === "FINGER_TAPPING") {
                  date.otherLeft = data.data;
                } else if (selectedTest.id === "TOE_TAPPING") {
                  date.otherLeft = data.a;
                }
              });

              setFullDates(dates);
            });
          });
        });
    }
  }, [id, db, selectedTest]);

  function toggleDate(e) {
    const { name } = e.target;
    const tempDates = [...fullDates];

    tempDates.forEach((date) => {
      if (date.id === name) {
        date.checked = !date.checked;
      }
    });

    setFullDates(tempDates);
  }

  function selectAll() {
    const tempDates = [...fullDates];

    tempDates.forEach((date) => {
      date.checked = true;
    });

    setFullDates(tempDates);
  }

  function uncheckAll() {
    const tempDates = [...fullDates];

    tempDates.forEach((date) => {
      date.checked = false;
    });

    setFullDates(tempDates);
  }

  function createFileName(date, side) {
    const nameFile =
      name.toUpperCase() +
      " " +
      selectedTest.id +
      " " +
      date +
      " " +
      side +
      ".txt";
    return nameFile;
  }

  function createFileContex(side, date) {
    let context = "";
    let hour = date.hoursSinceLastMed;
    if (date.hoursSinceLastMed === '""') {
      hour = 0;
    }

    const baseInfo =
      "Name user: " +
      name +
      "\n" +
      "Type test: " +
      selectedTest.name +
      "\n" +
      "Date test: " +
      date.id +
      "\n" +
      "Hours since last med: " +
      hour +
      "\n" +
      "Side: " +
      side.toUpperCase() +
      "\n" +
      "Data: \n timestamp, x, y, z" +
      "\n";

    let mainDate = "";
    let otherDate = "";

    if (side === "right") {
      mainDate = date.right.join("\n");
      if (date.otherRight.length > 0) {
        otherDate = date.otherRight.join("\n");
      }
    } else if (side === "left") {
      mainDate = date.left.join("\n");
      if (date.otherLeft.length > 0) {
        otherDate = date.otherLeft.join("\n");
      }
    }

    return baseInfo + mainDate + "\n" + otherDate;
  }

  function saveFile(context, nameFile) {
    var FileSaver = require("file-saver");
    var blob = new Blob([context], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, nameFile);
  }

  function saveFiles() {
    console.log(fullDates);
    fullDates
      .filter((date) => date.checked)
      .forEach((date) => {
        saveFile(
          createFileContex("right", date),
          createFileName(date.id, "RIGHT")
        );
        saveFile(
          createFileContex("left", date),
          createFileName(date.id, "LEFT")
        );
      });
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-no-wrap max-w-2xl mx-auto py-4 sm:py-4 lg:max-w-7xl lg:px-8">
        {/* Sidebar starts */}
        {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
        <div className="w-64 bg-gray-100 shadow">
          <PatientTestSelector
            selectedTest={selectedTest}
            tests={tests}
            setSelectedTest={setSelectedTest}
          />
          {fullDates.length > 0 ? (
            <div>
              <PatientDataCheckbox dates={fullDates} toggleDate={toggleDate} />
              <PatientButton
                dates={fullDates}
                selectAll={selectAll}
                uncheckAll={uncheckAll}
                saveFile={saveFiles}
              />
            </div>
          ) : (
            <div className="text-center mb-6 px-4">
              {" "}
              Brak pomiarów dla wybranego testu.
            </div>
          )}
        </div>
        {/* Sidebar ends */}
        {/* Remove class [ h-64 ] when adding a card block */}
        <div className="container mx-auto pl-6">
          {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
          <div className=" h-full">
            {/* Place your content here */}
            {fullDates
              .filter((date) => date.checked)
              .map((date) => (
                <div className="rounded border-dashed border-2 border-gray-300 mb-4">
                  <PatientChart
                    date={date}
                    xaxisTitle={xaxisTitle}
                    yaxisTitle={yaxisTitle}
                  />
                </div>
              ))}

            {fullDates.filter((date) => date.checked).length === 0 && (
              <div className="h-full rounded border-dashed border-2 border-gray-300 mb-4 flex justify-center items-center text-3xl text-gray-600">
                Wybierz test z menu po lewej stronie
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
