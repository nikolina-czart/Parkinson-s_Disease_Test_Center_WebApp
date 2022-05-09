import {
  FingerPrint,
  Microphone,
  Chip,
  Support,
  Globe,
  Scale,
} from "heroicons-react";

export const TESTS = [
  {
    id: "FINGER_TAPPING",
    name: "Finger Tapping",
    description:
      "Test stukania palcem (FTT) to test neuropsychologiczny, który bada funkcjonowanie motoryczne, w szczególności prędkość motoryczną i koordynację zorientowaną na boki. Podczas podawania, dłoń badanego powinna być nieruchoma i płaska na planszy, z wyciągniętymi palcami i umieszczonym na urządzeniu liczącym.",
    icon: FingerPrint,
    xaxis: "timestamp [s]",
    yaxis: "Jednostka przyspieszenia [m/s2] ",
    nameDate: "data",
  },
  {
    id: "STATIC_TEST",
    name: "Static Test",
    description:
      "Niestabilność postawy jest cechą upośledzającą chorobę Parkinsona (PD), która przyczynia się do nawracających upadków i urazów związanych z upadkiem. Test retropulsji jest powszechnie uważany za złoty standard oceny niestabilności postawy i dlatego jest kluczowym elementem badania neurologicznego w PD.",
    icon: Chip,
    xaxis: "",
    yaxis: "",
    nameDate: "",
  },
  {
    id: "TOE_TAPPING",
    name: "Toe Tapping",
    description:
      "Test tupania stopą (FTT) może być stosowany do oceny dysfunkcji górnych neuronów ruchowych w populacjach klinicznych. FTT jest najprostszą i najłatwiejszą metodą ilościowej analizy dysfunkcji ruchowych kończyn dolnych w chorobach górnych neuronów ruchowych.",
    icon: Support,
    xaxis: "",
    yaxis: "",
    nameDate: "a",
  },
  {
    id: "VOICE_TEST",
    name: "Voice Test",
    description:
      "Testy głosowe są tak samo dokładne, jak testy kliniczne, ale dodatkowo można je przeprowadzać zdalnie, a pacjenci mogą je wykonywać samodzielnie. Ponadto są szybkie (trwają mniej niż 30 sekund) i są bardzo tanie ( nie wymagają czasu ekspertów). Dzięki temu są skalowalne.",
    icon: Microphone,
    xaxis: "",
    yaxis: "",
    nameDate: "",
  },
  {
    id: "GYROSCOPE_TEST",
    name: "Gyroscope Test",
    description:
      "Żyroskop to urządzenie służące do pomiaru lub utrzymywania położenia kątowego. Mówiąc prościej, żyroskop służy do precyzyjnego określania położenia urządzenia. Dzięki niemu możliwe jest ustalenie położenia obiektu oraz to czy i wokół której osi został obrócony.",
    icon: Scale,
    xaxis: "timestamp [s]",
    yaxis: "Prędkość obrotowa [°/s]",
    nameDate: "",
  },
  {
    id: "ACCELEROMETER_TEST",
    name: "Accelerometer Test",
    description:
      "Akcelerometr (zamiennie, chociaż rzadziej określany również jako przyspieszeniomierz) jest przyrządem do pomiaru przyspieszenia liniowego lub kątowego. Akcelerometr może mierzyć ruch własny, jak również ruch urządzenia, w którym został zastosowany.",
    icon: Globe,
    xaxis: "timestamp [s]",
    yaxis: "Jednostka przyspieszenia [m/s2] ",
    nameDate: "",
  },
];
