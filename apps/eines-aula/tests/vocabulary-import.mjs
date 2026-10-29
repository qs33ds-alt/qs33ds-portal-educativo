// tests/vocabulary-import.tsx
import assert from "node:assert/strict";
import { create, act } from "react-test-renderer";

// src/data/vocabulary.ts
var topics = { animals: "Animals", aula: "Aula", casa: "Casa", aliments: "Aliments", natura: "Natura", transport: "Transports", cos: "Cos", roba: "Roba", joc: "Jocs i m\xFAsica", persones: "Persones" };
var vocabulary = [
  {
    "word": "casa",
    "syllables": [
      "ca",
      "sa"
    ],
    "topic": "casa"
  },
  {
    "word": "pilota",
    "syllables": [
      "pi",
      "lo",
      "ta"
    ],
    "topic": "joc"
  },
  {
    "word": "taula",
    "syllables": [
      "tau",
      "la"
    ],
    "topic": "casa",
    "note": "Les vocals au formen un diftong i es mantenen juntes."
  },
  {
    "word": "escola",
    "syllables": [
      "es",
      "co",
      "la"
    ],
    "topic": "aula"
  },
  {
    "word": "mama",
    "syllables": [
      "ma",
      "ma"
    ],
    "topic": "persones"
  },
  {
    "word": "papa",
    "syllables": [
      "pa",
      "pa"
    ],
    "topic": "persones"
  },
  {
    "word": "pera",
    "syllables": [
      "pe",
      "ra"
    ],
    "topic": "aliments"
  },
  {
    "word": "poma",
    "syllables": [
      "po",
      "ma"
    ],
    "topic": "aliments"
  },
  {
    "word": "lluna",
    "syllables": [
      "llu",
      "na"
    ],
    "topic": "natura"
  },
  {
    "word": "sabata",
    "syllables": [
      "sa",
      "ba",
      "ta"
    ],
    "topic": "roba"
  },
  {
    "word": "m\xE0",
    "syllables": [
      "m\xE0"
    ],
    "topic": "cos"
  },
  {
    "word": "mar",
    "syllables": [
      "mar"
    ],
    "topic": "natura"
  },
  {
    "word": "sol",
    "syllables": [
      "sol"
    ],
    "topic": "natura"
  },
  {
    "word": "gat",
    "syllables": [
      "gat"
    ],
    "topic": "animals"
  },
  {
    "word": "gos",
    "syllables": [
      "gos"
    ],
    "topic": "animals"
  },
  {
    "word": "tren",
    "syllables": [
      "tren"
    ],
    "topic": "transport"
  },
  {
    "word": "flor",
    "syllables": [
      "flor"
    ],
    "topic": "natura"
  },
  {
    "word": "platja",
    "syllables": [
      "plat",
      "ja"
    ],
    "topic": "natura",
    "note": "El grup tj se separa: plat-ja."
  },
  {
    "word": "aigua",
    "syllables": [
      "ai",
      "gua"
    ],
    "topic": "natura",
    "note": "Els grups ai i gua es mantenen dins les seves s\xEDl\xB7labes."
  },
  {
    "word": "finestra",
    "syllables": [
      "fi",
      "nes",
      "tra"
    ],
    "topic": "casa"
  },
  {
    "word": "cotxe",
    "syllables": [
      "cot",
      "xe"
    ],
    "topic": "transport",
    "note": "El grup tx se separa: cot-xe."
  },
  {
    "word": "llibre",
    "syllables": [
      "lli",
      "bre"
    ],
    "topic": "aula"
  },
  {
    "word": "paper",
    "syllables": [
      "pa",
      "per"
    ],
    "topic": "aula"
  },
  {
    "word": "caramel",
    "syllables": [
      "ca",
      "ra",
      "mel"
    ],
    "topic": "aliments"
  },
  {
    "word": "cadira",
    "syllables": [
      "ca",
      "di",
      "ra"
    ],
    "topic": "casa"
  },
  {
    "word": "papallona",
    "syllables": [
      "pa",
      "pa",
      "llo",
      "na"
    ],
    "topic": "animals"
  },
  {
    "word": "vaca",
    "syllables": [
      "va",
      "ca"
    ],
    "topic": "animals"
  },
  {
    "word": "cavall",
    "syllables": [
      "ca",
      "vall"
    ],
    "topic": "animals"
  },
  {
    "word": "ovella",
    "syllables": [
      "o",
      "ve",
      "lla"
    ],
    "topic": "animals"
  },
  {
    "word": "conill",
    "syllables": [
      "co",
      "nill"
    ],
    "topic": "animals",
    "note": "El d\xEDgraf ll es mant\xE9 junt."
  },
  {
    "word": "gallina",
    "syllables": [
      "ga",
      "lli",
      "na"
    ],
    "topic": "animals"
  },
  {
    "word": "pollet",
    "syllables": [
      "po",
      "llet"
    ],
    "topic": "animals"
  },
  {
    "word": "\xE0nec",
    "syllables": [
      "\xE0",
      "nec"
    ],
    "topic": "animals"
  },
  {
    "word": "ocell",
    "syllables": [
      "o",
      "cell"
    ],
    "topic": "animals"
  },
  {
    "word": "peix",
    "syllables": [
      "peix"
    ],
    "topic": "animals"
  },
  {
    "word": "bou",
    "syllables": [
      "bou"
    ],
    "topic": "animals"
  },
  {
    "word": "porc",
    "syllables": [
      "porc"
    ],
    "topic": "animals"
  },
  {
    "word": "cargol",
    "syllables": [
      "car",
      "gol"
    ],
    "topic": "animals"
  },
  {
    "word": "formiga",
    "syllables": [
      "for",
      "mi",
      "ga"
    ],
    "topic": "animals"
  },
  {
    "word": "mosca",
    "syllables": [
      "mos",
      "ca"
    ],
    "topic": "animals"
  },
  {
    "word": "aranya",
    "syllables": [
      "a",
      "ra",
      "nya"
    ],
    "topic": "animals"
  },
  {
    "word": "abella",
    "syllables": [
      "a",
      "be",
      "lla"
    ],
    "topic": "animals"
  },
  {
    "word": "girafa",
    "syllables": [
      "gi",
      "ra",
      "fa"
    ],
    "topic": "animals"
  },
  {
    "word": "elefant",
    "syllables": [
      "e",
      "le",
      "fant"
    ],
    "topic": "animals"
  },
  {
    "word": "tortuga",
    "syllables": [
      "tor",
      "tu",
      "ga"
    ],
    "topic": "animals"
  },
  {
    "word": "granota",
    "syllables": [
      "gra",
      "no",
      "ta"
    ],
    "topic": "animals"
  },
  {
    "word": "serp",
    "syllables": [
      "serp"
    ],
    "topic": "animals"
  },
  {
    "word": "ratol\xED",
    "syllables": [
      "ra",
      "to",
      "l\xED"
    ],
    "topic": "animals"
  },
  {
    "word": "esquirol",
    "syllables": [
      "es",
      "qui",
      "rol"
    ],
    "topic": "animals"
  },
  {
    "word": "dof\xED",
    "syllables": [
      "do",
      "f\xED"
    ],
    "topic": "animals"
  },
  {
    "word": "balena",
    "syllables": [
      "ba",
      "le",
      "na"
    ],
    "topic": "animals"
  },
  {
    "word": "lle\xF3",
    "syllables": [
      "lle",
      "\xF3"
    ],
    "topic": "animals",
    "note": "Les vocals e i \xF3 formen un hiat: lle-\xF3."
  },
  {
    "word": "llapis",
    "syllables": [
      "lla",
      "pis"
    ],
    "topic": "aula"
  },
  {
    "word": "goma",
    "syllables": [
      "go",
      "ma"
    ],
    "topic": "aula"
  },
  {
    "word": "llibreta",
    "syllables": [
      "lli",
      "bre",
      "ta"
    ],
    "topic": "aula"
  },
  {
    "word": "carpeta",
    "syllables": [
      "car",
      "pe",
      "ta"
    ],
    "topic": "aula"
  },
  {
    "word": "tisores",
    "syllables": [
      "ti",
      "so",
      "res"
    ],
    "topic": "aula"
  },
  {
    "word": "pissarra",
    "syllables": [
      "pis",
      "sar",
      "ra"
    ],
    "topic": "aula",
    "note": "Els grups ss i rr se separen: pis-sar-ra."
  },
  {
    "word": "guix",
    "syllables": [
      "guix"
    ],
    "topic": "aula"
  },
  {
    "word": "pintura",
    "syllables": [
      "pin",
      "tu",
      "ra"
    ],
    "topic": "aula"
  },
  {
    "word": "pinzell",
    "syllables": [
      "pin",
      "zell"
    ],
    "topic": "aula"
  },
  {
    "word": "regle",
    "syllables": [
      "re",
      "gle"
    ],
    "topic": "aula"
  },
  {
    "word": "estoig",
    "syllables": [
      "es",
      "toig"
    ],
    "topic": "aula"
  },
  {
    "word": "full",
    "syllables": [
      "full"
    ],
    "topic": "aula"
  },
  {
    "word": "dibuix",
    "syllables": [
      "di",
      "buix"
    ],
    "topic": "aula"
  },
  {
    "word": "paraula",
    "syllables": [
      "pa",
      "rau",
      "la"
    ],
    "topic": "aula"
  },
  {
    "word": "lletra",
    "syllables": [
      "lle",
      "tra"
    ],
    "topic": "aula"
  },
  {
    "word": "n\xFAmero",
    "syllables": [
      "n\xFA",
      "me",
      "ro"
    ],
    "topic": "aula"
  },
  {
    "word": "mestre",
    "syllables": [
      "mes",
      "tre"
    ],
    "topic": "aula"
  },
  {
    "word": "mestra",
    "syllables": [
      "mes",
      "tra"
    ],
    "topic": "aula"
  },
  {
    "word": "company",
    "syllables": [
      "com",
      "pany"
    ],
    "topic": "aula"
  },
  {
    "word": "porta",
    "syllables": [
      "por",
      "ta"
    ],
    "topic": "casa"
  },
  {
    "word": "llit",
    "syllables": [
      "llit"
    ],
    "topic": "casa"
  },
  {
    "word": "sof\xE0",
    "syllables": [
      "so",
      "f\xE0"
    ],
    "topic": "casa"
  },
  {
    "word": "cuina",
    "syllables": [
      "cui",
      "na"
    ],
    "topic": "casa"
  },
  {
    "word": "plat",
    "syllables": [
      "plat"
    ],
    "topic": "casa"
  },
  {
    "word": "got",
    "syllables": [
      "got"
    ],
    "topic": "casa"
  },
  {
    "word": "tassa",
    "syllables": [
      "tas",
      "sa"
    ],
    "topic": "casa"
  },
  {
    "word": "cullera",
    "syllables": [
      "cu",
      "lle",
      "ra"
    ],
    "topic": "casa"
  },
  {
    "word": "forquilla",
    "syllables": [
      "for",
      "qui",
      "lla"
    ],
    "topic": "casa"
  },
  {
    "word": "ganivet",
    "syllables": [
      "ga",
      "ni",
      "vet"
    ],
    "topic": "casa"
  },
  {
    "word": "rellotge",
    "syllables": [
      "re",
      "llot",
      "ge"
    ],
    "topic": "casa"
  },
  {
    "word": "mirall",
    "syllables": [
      "mi",
      "rall"
    ],
    "topic": "casa"
  },
  {
    "word": "coix\xED",
    "syllables": [
      "coi",
      "x\xED"
    ],
    "topic": "casa"
  },
  {
    "word": "catifa",
    "syllables": [
      "ca",
      "ti",
      "fa"
    ],
    "topic": "casa"
  },
  {
    "word": "dutxa",
    "syllables": [
      "dut",
      "xa"
    ],
    "topic": "casa"
  },
  {
    "word": "sab\xF3",
    "syllables": [
      "sa",
      "b\xF3"
    ],
    "topic": "casa"
  },
  {
    "word": "tovallola",
    "syllables": [
      "to",
      "va",
      "llo",
      "la"
    ],
    "topic": "casa"
  },
  {
    "word": "escala",
    "syllables": [
      "es",
      "ca",
      "la"
    ],
    "topic": "casa"
  },
  {
    "word": "armari",
    "syllables": [
      "ar",
      "ma",
      "ri"
    ],
    "topic": "casa"
  },
  {
    "word": "pa",
    "syllables": [
      "pa"
    ],
    "topic": "aliments"
  },
  {
    "word": "llet",
    "syllables": [
      "llet"
    ],
    "topic": "aliments"
  },
  {
    "word": "ou",
    "syllables": [
      "ou"
    ],
    "topic": "aliments"
  },
  {
    "word": "arr\xF2s",
    "syllables": [
      "ar",
      "r\xF2s"
    ],
    "topic": "aliments"
  },
  {
    "word": "sopa",
    "syllables": [
      "so",
      "pa"
    ],
    "topic": "aliments"
  },
  {
    "word": "pasta",
    "syllables": [
      "pas",
      "ta"
    ],
    "topic": "aliments"
  },
  {
    "word": "patata",
    "syllables": [
      "pa",
      "ta",
      "ta"
    ],
    "topic": "aliments"
  },
  {
    "word": "tom\xE0quet",
    "syllables": [
      "to",
      "m\xE0",
      "quet"
    ],
    "topic": "aliments"
  },
  {
    "word": "pastanaga",
    "syllables": [
      "pas",
      "ta",
      "na",
      "ga"
    ],
    "topic": "aliments"
  },
  {
    "word": "enciam",
    "syllables": [
      "en",
      "ci",
      "am"
    ],
    "topic": "aliments",
    "note": "Les vocals i i a formen un hiat: en-ci-am."
  },
  {
    "word": "ceba",
    "syllables": [
      "ce",
      "ba"
    ],
    "topic": "aliments"
  },
  {
    "word": "formatge",
    "syllables": [
      "for",
      "mat",
      "ge"
    ],
    "topic": "aliments"
  },
  {
    "word": "iogurt",
    "syllables": [
      "io",
      "gurt"
    ],
    "topic": "aliments"
  },
  {
    "word": "galeta",
    "syllables": [
      "ga",
      "le",
      "ta"
    ],
    "topic": "aliments"
  },
  {
    "word": "xocolata",
    "syllables": [
      "xo",
      "co",
      "la",
      "ta"
    ],
    "topic": "aliments"
  },
  {
    "word": "mandarina",
    "syllables": [
      "man",
      "da",
      "ri",
      "na"
    ],
    "topic": "aliments"
  },
  {
    "word": "taronja",
    "syllables": [
      "ta",
      "ron",
      "ja"
    ],
    "topic": "aliments"
  },
  {
    "word": "maduixa",
    "syllables": [
      "ma",
      "dui",
      "xa"
    ],
    "topic": "aliments"
  },
  {
    "word": "pl\xE0tan",
    "syllables": [
      "pl\xE0",
      "tan"
    ],
    "topic": "aliments"
  },
  {
    "word": "s\xEDndria",
    "syllables": [
      "s\xEDn",
      "dri",
      "a"
    ],
    "topic": "aliments",
    "note": "Les vocals i i a finals formen un hiat: s\xEDn-dri-a."
  },
  {
    "word": "pr\xE9ssec",
    "syllables": [
      "pr\xE9s",
      "sec"
    ],
    "topic": "aliments"
  },
  {
    "word": "ra\xEFm",
    "syllables": [
      "ra",
      "\xEFm"
    ],
    "topic": "aliments",
    "note": "La di\xE8resi indica que a i \xEF es pronuncien en s\xEDl\xB7labes diferents."
  },
  {
    "word": "mel",
    "syllables": [
      "mel"
    ],
    "topic": "aliments"
  },
  {
    "word": "sal",
    "syllables": [
      "sal"
    ],
    "topic": "aliments"
  },
  {
    "word": "cel",
    "syllables": [
      "cel"
    ],
    "topic": "natura"
  },
  {
    "word": "n\xFAvol",
    "syllables": [
      "n\xFA",
      "vol"
    ],
    "topic": "natura"
  },
  {
    "word": "pluja",
    "syllables": [
      "plu",
      "ja"
    ],
    "topic": "natura"
  },
  {
    "word": "neu",
    "syllables": [
      "neu"
    ],
    "topic": "natura"
  },
  {
    "word": "vent",
    "syllables": [
      "vent"
    ],
    "topic": "natura"
  },
  {
    "word": "riu",
    "syllables": [
      "riu"
    ],
    "topic": "natura"
  },
  {
    "word": "muntanya",
    "syllables": [
      "mun",
      "ta",
      "nya"
    ],
    "topic": "natura",
    "note": "El d\xEDgraf ny es mant\xE9 junt."
  },
  {
    "word": "pedra",
    "syllables": [
      "pe",
      "dra"
    ],
    "topic": "natura"
  },
  {
    "word": "arbre",
    "syllables": [
      "ar",
      "bre"
    ],
    "topic": "natura"
  },
  {
    "word": "bosc",
    "syllables": [
      "bosc"
    ],
    "topic": "natura"
  },
  {
    "word": "fulla",
    "syllables": [
      "fu",
      "lla"
    ],
    "topic": "natura"
  },
  {
    "word": "herba",
    "syllables": [
      "her",
      "ba"
    ],
    "topic": "natura"
  },
  {
    "word": "terra",
    "syllables": [
      "ter",
      "ra"
    ],
    "topic": "natura"
  },
  {
    "word": "sorra",
    "syllables": [
      "sor",
      "ra"
    ],
    "topic": "natura"
  },
  {
    "word": "estrella",
    "syllables": [
      "es",
      "tre",
      "lla"
    ],
    "topic": "natura"
  },
  {
    "word": "bolet",
    "syllables": [
      "bo",
      "let"
    ],
    "topic": "natura"
  },
  {
    "word": "roca",
    "syllables": [
      "ro",
      "ca"
    ],
    "topic": "natura"
  },
  {
    "word": "foc",
    "syllables": [
      "foc"
    ],
    "topic": "natura"
  },
  {
    "word": "bus",
    "syllables": [
      "bus"
    ],
    "topic": "transport"
  },
  {
    "word": "moto",
    "syllables": [
      "mo",
      "to"
    ],
    "topic": "transport"
  },
  {
    "word": "avi\xF3",
    "syllables": [
      "a",
      "vi",
      "\xF3"
    ],
    "topic": "transport",
    "note": "Les vocals i i \xF3 pertanyen a s\xEDl\xB7labes diferents."
  },
  {
    "word": "cami\xF3",
    "syllables": [
      "ca",
      "mi",
      "\xF3"
    ],
    "topic": "transport",
    "note": "Les vocals i i \xF3 formen un hiat: ca-mi-\xF3."
  },
  {
    "word": "barca",
    "syllables": [
      "bar",
      "ca"
    ],
    "topic": "transport"
  },
  {
    "word": "vaixell",
    "syllables": [
      "vai",
      "xell"
    ],
    "topic": "transport"
  },
  {
    "word": "bicicleta",
    "syllables": [
      "bi",
      "ci",
      "cle",
      "ta"
    ],
    "topic": "transport"
  },
  {
    "word": "patinet",
    "syllables": [
      "pa",
      "ti",
      "net"
    ],
    "topic": "transport"
  },
  {
    "word": "tractor",
    "syllables": [
      "trac",
      "tor"
    ],
    "topic": "transport"
  },
  {
    "word": "helic\xF2pter",
    "syllables": [
      "he",
      "li",
      "c\xF2p",
      "ter"
    ],
    "topic": "transport"
  },
  {
    "word": "ambul\xE0ncia",
    "syllables": [
      "am",
      "bu",
      "l\xE0n",
      "ci",
      "a"
    ],
    "topic": "transport"
  },
  {
    "word": "cap",
    "syllables": [
      "cap"
    ],
    "topic": "cos"
  },
  {
    "word": "peu",
    "syllables": [
      "peu"
    ],
    "topic": "cos"
  },
  {
    "word": "nas",
    "syllables": [
      "nas"
    ],
    "topic": "cos"
  },
  {
    "word": "ull",
    "syllables": [
      "ull"
    ],
    "topic": "cos"
  },
  {
    "word": "boca",
    "syllables": [
      "bo",
      "ca"
    ],
    "topic": "cos"
  },
  {
    "word": "bra\xE7",
    "syllables": [
      "bra\xE7"
    ],
    "topic": "cos"
  },
  {
    "word": "cama",
    "syllables": [
      "ca",
      "ma"
    ],
    "topic": "cos"
  },
  {
    "word": "dit",
    "syllables": [
      "dit"
    ],
    "topic": "cos"
  },
  {
    "word": "orella",
    "syllables": [
      "o",
      "re",
      "lla"
    ],
    "topic": "cos"
  },
  {
    "word": "panxa",
    "syllables": [
      "pan",
      "xa"
    ],
    "topic": "cos"
  },
  {
    "word": "cabell",
    "syllables": [
      "ca",
      "bell"
    ],
    "topic": "cos"
  },
  {
    "word": "esquena",
    "syllables": [
      "es",
      "que",
      "na"
    ],
    "topic": "cos"
  },
  {
    "word": "genoll",
    "syllables": [
      "ge",
      "noll"
    ],
    "topic": "cos"
  },
  {
    "word": "llengua",
    "syllables": [
      "llen",
      "gua"
    ],
    "topic": "cos"
  },
  {
    "word": "samarreta",
    "syllables": [
      "sa",
      "mar",
      "re",
      "ta"
    ],
    "topic": "roba"
  },
  {
    "word": "pantalons",
    "syllables": [
      "pan",
      "ta",
      "lons"
    ],
    "topic": "roba"
  },
  {
    "word": "jaqueta",
    "syllables": [
      "ja",
      "que",
      "ta"
    ],
    "topic": "roba"
  },
  {
    "word": "mitj\xF3",
    "syllables": [
      "mit",
      "j\xF3"
    ],
    "topic": "roba"
  },
  {
    "word": "faldilla",
    "syllables": [
      "fal",
      "di",
      "lla"
    ],
    "topic": "roba"
  },
  {
    "word": "vestit",
    "syllables": [
      "ves",
      "tit"
    ],
    "topic": "roba"
  },
  {
    "word": "bufanda",
    "syllables": [
      "bu",
      "fan",
      "da"
    ],
    "topic": "roba"
  },
  {
    "word": "gorra",
    "syllables": [
      "gor",
      "ra"
    ],
    "topic": "roba"
  },
  {
    "word": "guant",
    "syllables": [
      "guant"
    ],
    "topic": "roba"
  },
  {
    "word": "bot\xF3",
    "syllables": [
      "bo",
      "t\xF3"
    ],
    "topic": "roba"
  },
  {
    "word": "nina",
    "syllables": [
      "ni",
      "na"
    ],
    "topic": "joc"
  },
  {
    "word": "dau",
    "syllables": [
      "dau"
    ],
    "topic": "joc"
  },
  {
    "word": "joc",
    "syllables": [
      "joc"
    ],
    "topic": "joc"
  },
  {
    "word": "corda",
    "syllables": [
      "cor",
      "da"
    ],
    "topic": "joc"
  },
  {
    "word": "conte",
    "syllables": [
      "con",
      "te"
    ],
    "topic": "joc"
  },
  {
    "word": "can\xE7\xF3",
    "syllables": [
      "can",
      "\xE7\xF3"
    ],
    "topic": "joc"
  },
  {
    "word": "timbal",
    "syllables": [
      "tim",
      "bal"
    ],
    "topic": "joc"
  },
  {
    "word": "guitarra",
    "syllables": [
      "gui",
      "tar",
      "ra"
    ],
    "topic": "joc",
    "note": "El grup gu no se separa; el grup rr s\xED."
  },
  {
    "word": "piano",
    "syllables": [
      "pi",
      "a",
      "no"
    ],
    "topic": "joc",
    "note": "Les vocals i i a formen un hiat: pi-a-no."
  },
  {
    "word": "m\xFAsica",
    "syllables": [
      "m\xFA",
      "si",
      "ca"
    ],
    "topic": "joc"
  }
];
function normalize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("ca").trim();
}
function matchesWritten(word, query, position) {
  const w = normalize(word), q = normalize(query);
  if (!q) return true;
  if (position === "start") return w.startsWith(q);
  if (position === "end") return w.endsWith(q);
  if (position === "middle") {
    for (let i = 1; i + q.length < w.length; i++) if (w.slice(i, i + q.length) === q) return true;
    return false;
  }
  return w.includes(q);
}

// src/data/vocabularyImport.ts
var VOCABULARY_SCHEMA = "qs33ds.eines-vocabulary.v1";
var MAX_CUSTOM_WORDS = 500;
var MAX_DOCUMENT_WORDS = MAX_CUSTOM_WORDS + vocabulary.length;
var canonical = (s) => s.trim().normalize("NFC").toLocaleLowerCase("ca");
var wordKey = (s) => canonical(s);
var letters = /^(?=.*\p{L})[\p{L}\p{M}·'’-]+$/u;
function validateWord(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw Error("Cada entrada ha de ser un objecte amb word i syllables.");
  const item = input;
  if (typeof item.word !== "string" || !Array.isArray(item.syllables) || item.syllables.length < 1 || item.syllables.length > 8) throw Error("Cal una paraula i entre 1 i 8 s\xEDl\xB7labes expl\xEDcites.");
  const word = canonical(item.word);
  if (!word || word.length > 40 || !letters.test(word)) throw Error("La paraula ha de tenir entre 1 i 40 car\xE0cters, sense espais ni n\xFAmeros.");
  const syllables = item.syllables.map((s) => {
    if (typeof s !== "string") throw Error("Cada s\xEDl\xB7laba ha de ser text.");
    const value = canonical(s);
    if (!value || value.length > 40 || !letters.test(value)) throw Error("Les s\xEDl\xB7labes han de contenir lletres.");
    return value;
  });
  if (syllables.join("") !== word) throw Error(`Les s\xEDl\xB7labes de \xAB${word}\xBB no reconstrueixen la paraula. Revisa accents i separaci\xF3.`);
  return { word, syllables };
}
function parseVocabulary(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw Error("El JSON no t\xE9 el format del banc de vocabulari.");
  const data = input;
  if (data.schema !== VOCABULARY_SCHEMA || data.language !== "ca" || !Array.isArray(data.words)) throw Error("Cal schema qs33ds.eines-vocabulary.v1, language ca i una llista words.");
  if (data.words.length < 1 || data.words.length > MAX_DOCUMENT_WORDS) throw Error(`El fitxer ha de contenir entre 1 i ${MAX_DOCUMENT_WORDS} paraules, incl\xF2s el banc inicial.`);
  const words = data.words.map((w, i) => {
    try {
      return validateWord(w);
    } catch (e) {
      throw Error(`Entrada ${i + 1}: ${e.message}`);
    }
  });
  const seen = /* @__PURE__ */ new Set();
  for (const w of words) {
    const key = wordKey(w.word);
    if (seen.has(key)) throw Error(`La paraula \xAB${w.word}\xBB est\xE0 repetida dins del fitxer.`);
    seen.add(key);
  }
  return words;
}
function parseVocabularyText(text) {
  if (text.length > 1e6) throw Error("El fitxer supera el l\xEDmit d\u20191 MB.");
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw Error("El fitxer no \xE9s un JSON v\xE0lid.");
  }
  return parseVocabulary(data);
}
function vocabularyDocument(words) {
  return { schema: VOCABULARY_SCHEMA, language: "ca", words };
}
function mergeVocabulary(base, custom, incoming) {
  const map = new Map([...base, ...custom].map((w) => [wordKey(w.word), w]));
  const additions = [];
  for (const w of incoming) {
    const existing = map.get(wordKey(w.word));
    if (existing) {
      if (existing.syllables.join("|") !== w.syllables.join("|")) throw Error(`\xAB${w.word}\xBB ja existeix amb una separaci\xF3 diferent. No s\u2019ha incorporat cap entrada.`);
      continue;
    }
    additions.push(w);
    map.set(wordKey(w.word), w);
  }
  if (custom.length + additions.length > MAX_CUSTOM_WORDS) throw Error("El banc personalitzat no pot superar 500 paraules.");
  return { custom: [...custom, ...additions], added: additions.length, skipped: incoming.length - additions.length };
}

// src/data/vocabularyStore.ts
import { useSyncExternalStore } from "react";
var VOCABULARY_KEY = "qs33ds_eines_vocabulary_v1";
var initial = { words: vocabulary, custom: [], warning: "" };
function read() {
  try {
    if (typeof localStorage === "undefined") return initial;
    const raw = localStorage.getItem(VOCABULARY_KEY);
    if (!raw) return initial;
    const incoming = parseVocabulary(JSON.parse(raw));
    const merged = mergeVocabulary(vocabulary, [], incoming);
    return { words: [...vocabulary, ...merged.custom], custom: merged.custom, warning: "" };
  } catch {
    return { ...initial, warning: "No s\u2019ha pogut llegir el banc desat. Es conserva el banc inicial; el fitxer desat no s\u2019ha sobreescrit." };
  }
}
var state = read();
var listeners = /* @__PURE__ */ new Set();
function notify() {
  listeners.forEach((l) => l());
}
function save(custom) {
  let warning = "";
  try {
    if (typeof localStorage === "undefined") throw Error();
    if (custom.length) localStorage.setItem(VOCABULARY_KEY, JSON.stringify(vocabularyDocument(custom)));
    else localStorage.removeItem(VOCABULARY_KEY);
  } catch {
    warning = "El navegador no permet desar el banc. Les paraules es mantenen en aquesta sessi\xF3; exporta-les per conservar-les.";
  }
  state = { words: [...vocabulary, ...custom], custom, warning };
  notify();
}
function addVocabulary(incoming) {
  const result = mergeVocabulary(vocabulary, state.custom, parseVocabulary(vocabularyDocument(incoming)));
  if (result.added) save(result.custom);
  return result;
}
function removeVocabulary(word) {
  save(state.custom.filter((w) => wordKey(w.word) !== wordKey(word)));
}
function getVocabularySnapshot() {
  return state;
}
function useVocabulary() {
  return useSyncExternalStore((l) => {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, getVocabularySnapshot, () => initial);
}
if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("storage", (e) => {
  if (e.key === VOCABULARY_KEY || e.key === null) {
    state = read();
    notify();
  }
});

// src/modules/Words.tsx
import { useId as useId2, useState as useState2 } from "react";

// src/components/VocabularyEditor.tsx
import { useId, useRef, useState } from "react";

// src/utils/jsonFiles.ts
function downloadJson(name, value) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}

// src/components/VocabularyEditor.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var example = vocabularyDocument([{ word: "motxilla", syllables: ["mot", "xi", "lla"] }]);
function VocabularyEditor() {
  const id = useId(), bank = useVocabulary();
  const [word, setWord] = useState(""), [parts, setParts] = useState(""), [message, setMessage] = useState(""), [error, setError] = useState(""), [pending, setPending] = useState(null);
  const [removed, setRemoved] = useState(null);
  const [busy, setBusy] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const file = useRef(null);
  function preview(text) {
    setError("");
    setMessage("");
    setPending(null);
    try {
      setPending(parseVocabularyText(text));
    } catch (e) {
      setError(e.message);
    }
  }
  async function readFile(f) {
    if (!f) return;
    setError("");
    setMessage("");
    setPending(null);
    setBusy(true);
    try {
      if (f.size > 1e6) throw Error("El fitxer supera el l\xEDmit d\u20191 MB.");
      preview(await f.text());
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
      if (file.current) file.current.value = "";
    }
  }
  return /* @__PURE__ */ jsxs("details", { className: "vocabulary-editor", children: [
    /* @__PURE__ */ jsx("summary", { children: "Amplia i conserva el banc de paraules" }),
    /* @__PURE__ */ jsx("p", { children: "Les paraules afegides es comparteixen amb el laboratori de s\xEDl\xB7labes i es desen nom\xE9s en aquest navegador. Exporta una c\xF2pia per portar-les a un altre dispositiu." }),
    bank.warning && /* @__PURE__ */ jsx("p", { role: "alert", children: bank.warning }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      setError("");
      setMessage("");
      try {
        const entry = validateWord({ word, syllables: parts.trim().split(/\s*[·\-]\s*|\s+/u) });
        const result = addVocabulary([entry]);
        setMessage(result.added ? "Paraula afegida al banc compartit." : "Aquesta paraula ja \xE9s al banc.");
        setWord("");
        setParts("");
      } catch (e2) {
        setError(e2.message);
      }
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "form-grid", children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: id + "word", children: [
          "Paraula nova",
          /* @__PURE__ */ jsx("input", { id: id + "word", maxLength: 40, value: word, onChange: (e) => setWord(e.target.value), placeholder: "motxilla", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { htmlFor: id + "parts", children: [
          "S\xEDl\xB7labes separades per guions",
          /* @__PURE__ */ jsx("input", { id: id + "parts", maxLength: 100, value: parts, onChange: (e) => setParts(e.target.value), placeholder: "mot-xi-lla", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "action primary", disabled: !word.trim() || !parts.trim(), children: "Afegeix al banc" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx("button", { className: "action", disabled: busy, onClick: () => file.current?.click(), children: busy ? "Llegint..." : "Importa JSON" }),
      /* @__PURE__ */ jsx("button", { className: "action", onClick: () => downloadJson("QS33DS_vocabulari.json", vocabularyDocument(bank.words)), children: "Exporta el banc JSON" }),
      /* @__PURE__ */ jsx("button", { className: "action", onClick: () => downloadJson("QS33DS_vocabulari_model.json", example), children: "Descarrega el model JSON" })
    ] }),
    /* @__PURE__ */ jsx("input", { className: "visually-hidden", ref: file, type: "file", "aria-label": "Fitxer JSON de vocabulari", accept: ".json,application/json", onChange: (e) => {
      void readFile(e.target.files?.[0]);
    } }),
    /* @__PURE__ */ jsxs("details", { children: [
      /* @__PURE__ */ jsx("summary", { children: "O enganxa el JSON directament" }),
      /* @__PURE__ */ jsx("label", { htmlFor: id + "json", children: "JSON per importar" }),
      /* @__PURE__ */ jsx("textarea", { id: id + "json", rows: 7, maxLength: 1e6, value: jsonText, onChange: (e) => setJsonText(e.target.value), placeholder: "Enganxa el document JSON complet..." }),
      /* @__PURE__ */ jsx("button", { className: "action", disabled: busy || !jsonText.trim(), onClick: () => preview(jsonText), children: "Valida el JSON enganxat" })
    ] }),
    pending && /* @__PURE__ */ jsxs("section", { className: "import-preview", "aria-label": "Revisi\xF3 de la importaci\xF3", children: [
      /* @__PURE__ */ jsxs("strong", { children: [
        pending.length,
        " entrades amb format v\xE0lid"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        pending.slice(0, 5).map((w) => `${w.word}: ${w.syllables.join(" \u2013 ")}`).join("; "),
        pending.length > 5 ? "\u2026" : ""
      ] }),
      /* @__PURE__ */ jsx("p", { children: "La validaci\xF3 comprova el format i la reconstrucci\xF3 de cada paraula; revisa que la separaci\xF3 ling\xFC\xEDstica sigui correcta." }),
      /* @__PURE__ */ jsxs("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx("button", { className: "action primary", onClick: () => {
          setError("");
          try {
            const r = addVocabulary(pending);
            setMessage(`${r.added} paraules afegides; ${r.skipped} ja existien.`);
            setPending(null);
          } catch (e) {
            setError(e.message);
          }
        }, children: "Incorpora les paraules" }),
        /* @__PURE__ */ jsx("button", { className: "action", onClick: () => setPending(null), children: "Cancel\xB7la la importaci\xF3" })
      ] })
    ] }),
    message && /* @__PURE__ */ jsx("p", { role: "status", children: message }),
    error && /* @__PURE__ */ jsx("p", { role: "alert", children: error }),
    bank.custom.length > 0 && /* @__PURE__ */ jsxs("details", { children: [
      /* @__PURE__ */ jsxs("summary", { children: [
        "Paraules personalitzades (",
        bank.custom.length,
        "/500)"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "custom-words", children: bank.custom.map((w) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsxs("span", { children: [
          w.word.toLocaleUpperCase("ca"),
          " \xB7 ",
          w.syllables.join(" \u2013 ")
        ] }),
        /* @__PURE__ */ jsx("button", { className: "action", "aria-label": `Elimina ${w.word}`, onClick: () => {
          setRemoved(w);
          removeVocabulary(w.word);
          setMessage(`\xAB${w.word}\xBB eliminada del banc personalitzat.`);
        }, children: "Elimina" })
      ] }, w.word)) })
    ] }),
    removed && /* @__PURE__ */ jsx("button", { className: "action", onClick: () => {
      setError("");
      try {
        addVocabulary([removed]);
        setRemoved(null);
        setMessage("Paraula restaurada.");
      } catch (e) {
        setError(e.message);
      }
    }, children: "Desf\xE9s l\u2019\xFAltima eliminaci\xF3" }),
    /* @__PURE__ */ jsxs("details", { children: [
      /* @__PURE__ */ jsx("summary", { children: "Format compatible per generar paraules amb ChatGPT" }),
      /* @__PURE__ */ jsx("p", { children: "Demana paraules en catal\xE0 amb aquest format, sense explicacions fora del JSON. Cada word ha de coincidir amb la uni\xF3 de les syllables. No hi incloguis dades d\u2019alumnat." }),
      /* @__PURE__ */ jsx("pre", { children: JSON.stringify(example, null, 2) })
    ] })
  ] });
}

// src/modules/Words.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Words() {
  const { words: vocabulary2 } = useVocabulary();
  const id = useId2();
  const [query, setQuery] = useState2(""), [position, setPosition] = useState2("any");
  const filtered = vocabulary2.filter((w) => matchesWritten(w.word, query, position));
  return /* @__PURE__ */ jsxs2("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsx2("div", { className: "tool-top", children: /* @__PURE__ */ jsx2("span", { children: "BANC COMPARTIT DE VOCABULARI" }) }),
    /* @__PURE__ */ jsx2("p", { className: "hint", children: "Cerca lletres o s\xEDl\xB7labes escrites. S\u2019ignoren els accents en la cerca; no \xE9s una classificaci\xF3 fon\xE8tica." }),
    /* @__PURE__ */ jsxs2("div", { className: "form-grid", children: [
      /* @__PURE__ */ jsxs2("label", { htmlFor: id + "q", children: [
        "Lletra o s\xEDl\xB7laba",
        /* @__PURE__ */ jsx2("input", { id: id + "q", maxLength: 30, value: query, placeholder: "Ex.: ma, p, ca...", onChange: (e) => setQuery(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs2("label", { htmlFor: id + "pos", children: [
        "Posici\xF3",
        /* @__PURE__ */ jsxs2("select", { id: id + "pos", value: position, onChange: (e) => setPosition(e.target.value), children: [
          /* @__PURE__ */ jsx2("option", { value: "any", children: "Qualsevol" }),
          /* @__PURE__ */ jsx2("option", { value: "start", children: "Al principi" }),
          /* @__PURE__ */ jsx2("option", { value: "middle", children: "Al mig" }),
          /* @__PURE__ */ jsx2("option", { value: "end", children: "Al final" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("p", { role: "status", children: [
      filtered.length,
      " paraules"
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "word-bank", children: filtered.map((w) => /* @__PURE__ */ jsxs2("article", { children: [
      /* @__PURE__ */ jsx2("strong", { children: w.word.toLocaleUpperCase("ca") }),
      /* @__PURE__ */ jsx2("span", { children: w.syllables.join(" \u2013 ").toLocaleUpperCase("ca") }),
      /* @__PURE__ */ jsxs2("small", { children: [
        w.syllables.length,
        " ",
        w.syllables.length === 1 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes"
      ] })
    ] }, w.word)) }),
    !filtered.length && /* @__PURE__ */ jsx2("p", { children: "Cap paraula del banc coincideix amb aquesta cerca." }),
    /* @__PURE__ */ jsx2("button", { className: "action", onClick: () => {
      setQuery("");
      setPosition("any");
    }, children: "Neteja els filtres" }),
    /* @__PURE__ */ jsx2(VocabularyEditor, {})
  ] });
}

// src/modules/Syllables.tsx
import { useId as useId3, useMemo, useState as useState3 } from "react";

// src/data/syllableActivities.ts
function boundaries(item) {
  let total = 0;
  return item.syllables.slice(0, -1).map((s) => {
    total += Array.from(s).length;
    return total;
  });
}
function correctBoundaries(item, selected) {
  const expected = boundaries(item);
  const actual = [...new Set(selected)].sort((a, b) => a - b);
  return expected.length === actual.length && expected.every((n, i) => n === actual[i]);
}
function correctOrder(item, order) {
  return order.length === item.syllables.length && new Set(order).size === order.length && order.every((i) => Number.isInteger(i) && i >= 0 && i < item.syllables.length) && order.map((i) => item.syllables[i]).join("|") === item.syllables.join("|");
}
function shuffledIndices(length) {
  const a = Array.from({ length }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.length > 1 && a.every((v, i) => v === i)) a.push(a.shift());
  return a;
}

// src/modules/Syllables.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function SyllableQuestion({ item, index, total, next, previous: previous2, mode, uppercase }) {
  const [answer, setAnswer] = useState3(null), [revealed, setRevealed] = useState3(false), [cuts, setCuts] = useState3([]), [order, setOrder] = useState3([]), [result, setResult] = useState3(null);
  const [tokens] = useState3(() => shuffledIndices(item.syllables.length));
  const show = (s) => uppercase ? s.toLocaleUpperCase("ca") : s;
  const letters2 = Array.from(item.word);
  function check() {
    setResult(mode === "split" ? correctBoundaries(item, cuts) : correctOrder(item, order));
  }
  return /* @__PURE__ */ jsxs3("section", { className: "syllable-question", children: [
    /* @__PURE__ */ jsxs3("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx3("span", { children: "SEPARACI\xD3 SIL\xB7L\xC0BICA" }),
      /* @__PURE__ */ jsxs3("span", { className: "micro-tag", children: [
        index + 1,
        " / ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsx3("p", { children: mode === "count" ? "Digues la paraula i fes una picada de mans per cada s\xEDl\xB7laba." : mode === "split" ? "Marca els l\xEDmits entre les s\xEDl\xB7labes. Si nom\xE9s en t\xE9 una, no marquis cap tall." : "Tria les s\xEDl\xB7labes en l\u2019ordre correcte per formar la paraula." }),
    /* @__PURE__ */ jsx3("div", { className: "syllable-word", children: show(item.word) }),
    mode === "count" ? /* @__PURE__ */ jsxs3(Fragment, { children: [
      /* @__PURE__ */ jsx3("p", { children: "QUANTES S\xCDL\xB7LABES T\xC9?" }),
      /* @__PURE__ */ jsx3("div", { className: "timer-actions", children: Array.from({ length: Math.max(4, item.syllables.length) }, (_, i) => i + 1).map((n) => /* @__PURE__ */ jsx3("button", { className: answer === n ? "action primary" : "action", "aria-pressed": answer === n, onClick: () => {
        setAnswer(n);
        setResult(n === item.syllables.length);
      }, children: n }, n)) })
    ] }) : mode === "split" ? /* @__PURE__ */ jsxs3(Fragment, { children: [
      /* @__PURE__ */ jsx3("div", { className: "letter-boundaries", role: "group", "aria-label": "L\xEDmits entre s\xEDl\xB7labes", children: letters2.map((letter, i) => /* @__PURE__ */ jsxs3("span", { children: [
        /* @__PURE__ */ jsx3("b", { children: show(letter) }),
        i < letters2.length - 1 && /* @__PURE__ */ jsx3("button", { className: cuts.includes(i + 1) ? "cut chosen" : "cut", "aria-label": `Separa despr\xE9s de ${letters2.slice(0, i + 1).join("")} (posici\xF3 ${i + 1})`, "aria-pressed": cuts.includes(i + 1), onClick: () => {
          setCuts((c) => c.includes(i + 1) ? c.filter((n) => n !== i + 1) : [...c, i + 1]);
          setResult(null);
        }, children: cuts.includes(i + 1) ? "|" : "\uFF0B" })
      ] }, i)) }),
      /* @__PURE__ */ jsx3("button", { className: "action primary", onClick: check, children: "Comprova la separaci\xF3" }),
      /* @__PURE__ */ jsx3("button", { className: "action", onClick: () => {
        setCuts([]);
        setResult(null);
      }, children: "Esborra els talls" })
    ] }) : /* @__PURE__ */ jsxs3(Fragment, { children: [
      /* @__PURE__ */ jsx3("div", { className: "assembled-word", "aria-label": "S\xEDl\xB7labes ordenades", children: order.length ? order.map((i) => /* @__PURE__ */ jsx3("span", { children: show(item.syllables[i]) }, i)) : /* @__PURE__ */ jsx3("span", { children: "Tria la primera s\xEDl\xB7laba." }) }),
      /* @__PURE__ */ jsx3("div", { className: "syllable-parts", children: tokens.map((i) => /* @__PURE__ */ jsx3("button", { className: "action", disabled: order.includes(i), onClick: () => {
        setOrder((o) => [...o, i]);
        setResult(null);
      }, children: show(item.syllables[i]) }, i)) }),
      /* @__PURE__ */ jsxs3("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx3("button", { className: "action primary", disabled: order.length !== item.syllables.length, onClick: check, children: "Comprova l\u2019ordre" }),
        /* @__PURE__ */ jsx3("button", { className: "action", disabled: !order.length, onClick: () => {
          setOrder((o) => o.slice(0, -1));
          setResult(null);
        }, children: "Desf\xE9s l\u2019\xFAltima s\xEDl\xB7laba" }),
        /* @__PURE__ */ jsx3("button", { className: "action", onClick: () => {
          setOrder([]);
          setResult(null);
        }, children: "Torna a ordenar" })
      ] })
    ] }),
    /* @__PURE__ */ jsx3("p", { className: "syllable-feedback", role: "status", children: result === null ? mode === "count" ? "Tria una resposta." : "Prepara la resposta i comprova-la." : result ? "MOLT B\xC9!" : "TORNA-HO A PROVAR. POTS CONSULTAR LA SOLUCI\xD3." }),
    revealed && /* @__PURE__ */ jsxs3("div", { className: "syllable-solution", children: [
      /* @__PURE__ */ jsx3("div", { className: "syllable-parts", "aria-label": "Separaci\xF3 sil\xB7l\xE0bica", children: item.syllables.map((s, i) => /* @__PURE__ */ jsx3("span", { children: show(s) }, i)) }),
      /* @__PURE__ */ jsxs3("p", { children: [
        item.syllables.length,
        " ",
        item.syllables.length === 1 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes",
        item.note ? ` \xB7 ${item.note}` : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx3("button", { className: "action", onClick: () => setRevealed((r) => !r), children: revealed ? "Amaga les s\xEDl\xB7labes" : "Mostra les s\xEDl\xB7labes" }),
      /* @__PURE__ */ jsx3("button", { className: "action", onClick: previous2, children: "\u2190 Paraula anterior" }),
      /* @__PURE__ */ jsx3("button", { className: "action primary", onClick: next, children: "Paraula seg\xFCent \u2192" })
    ] })
  ] });
}
function Syllables() {
  const id = useId3(), bank = useVocabulary();
  const [source, setSource] = useState3("all"), [index, setIndex] = useState3(0), [mode, setMode] = useState3("count"), [count, setCount] = useState3("all"), [topic, setTopic] = useState3("all"), [uppercase, setUppercase] = useState3(true);
  const words = useMemo(() => {
    const pool = source === "custom" ? bank.custom : source === "base" ? vocabulary : bank.words;
    return pool.filter((w) => (count === "all" || w.syllables.length === Number(count)) && (topic === "all" || w.topic === topic));
  }, [bank, source, count, topic]);
  const current = index % Math.max(1, words.length), item = words[current];
  return /* @__PURE__ */ jsxs3("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs3("div", { className: "syllable-controls form-grid", children: [
      /* @__PURE__ */ jsxs3("label", { htmlFor: id + "source", children: [
        "Paraules de l\u2019activitat",
        /* @__PURE__ */ jsxs3("select", { id: id + "source", value: source, onChange: (e) => {
          setSource(e.target.value);
          setIndex(0);
        }, children: [
          /* @__PURE__ */ jsx3("option", { value: "all", children: "Tot el banc compartit" }),
          /* @__PURE__ */ jsx3("option", { value: "base", children: "Banc inicial revisat" }),
          /* @__PURE__ */ jsx3("option", { value: "custom", children: "Nom\xE9s personalitzades" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("label", { htmlFor: id + "mode", children: [
        "Activitat",
        /* @__PURE__ */ jsxs3("select", { id: id + "mode", value: mode, onChange: (e) => setMode(e.target.value), children: [
          /* @__PURE__ */ jsx3("option", { value: "count", children: "Compta les s\xEDl\xB7labes" }),
          /* @__PURE__ */ jsx3("option", { value: "split", children: "Marca la separaci\xF3" }),
          /* @__PURE__ */ jsx3("option", { value: "order", children: "Ordena les s\xEDl\xB7labes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("label", { htmlFor: id + "count", children: [
        "Nombre de s\xEDl\xB7labes",
        /* @__PURE__ */ jsxs3("select", { id: id + "count", value: count, onChange: (e) => {
          setCount(e.target.value);
          setIndex(0);
        }, children: [
          /* @__PURE__ */ jsx3("option", { value: "all", children: "Qualsevol" }),
          Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ jsxs3("option", { value: i + 1, children: [
            i + 1,
            " ",
            i === 0 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes"
          ] }, i))
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("label", { htmlFor: id + "topic", children: [
        "Tema",
        /* @__PURE__ */ jsxs3("select", { id: id + "topic", value: topic, onChange: (e) => {
          setTopic(e.target.value);
          setIndex(0);
        }, children: [
          /* @__PURE__ */ jsx3("option", { value: "all", children: "Qualsevol tema" }),
          Object.entries(topics).map(([key, label]) => /* @__PURE__ */ jsx3("option", { value: key, children: label }, key))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "syllable-toolbar", children: [
      /* @__PURE__ */ jsxs3("label", { children: [
        /* @__PURE__ */ jsx3("input", { type: "checkbox", checked: uppercase, onChange: (e) => setUppercase(e.target.checked) }),
        " Mostra les paraules en maj\xFAscules"
      ] }),
      /* @__PURE__ */ jsx3("button", { className: "action", disabled: !words.length, onClick: () => setIndex((i) => words.length > 1 ? i + 1 + Math.floor(Math.random() * (words.length - 1)) : i + 1), children: "Tria una paraula a l\u2019atzar" }),
      /* @__PURE__ */ jsx3("button", { className: "action", onClick: () => {
        setCount("all");
        setTopic("all");
        setSource("all");
        setIndex(0);
      }, children: "Neteja els filtres" })
    ] }),
    /* @__PURE__ */ jsxs3("p", { className: "hint", children: [
      words.length,
      " paraules disponibles amb aquests filtres \xB7 ",
      vocabulary.length,
      " al banc inicial."
    ] }),
    item ? /* @__PURE__ */ jsx3(SyllableQuestion, { item, index: current, total: words.length, uppercase, mode, next: () => setIndex((i) => i + 1), previous: () => setIndex((i) => i === 0 ? words.length - 1 : i - 1) }, [source, mode, count, topic, index, item.word, item.syllables.join("|")].join(":")) : /* @__PURE__ */ jsx3("p", { role: "status", children: "No hi ha paraules amb aquests filtres. Neteja\u2019ls o importa paraules des del Banc de paraules." }),
    /* @__PURE__ */ jsxs3("details", { className: "syllable-guide", children: [
      /* @__PURE__ */ jsx3("summary", { children: "Orientacions i criteris ling\xFC\xEDstics" }),
      /* @__PURE__ */ jsx3("p", { children: "Una s\xEDl\xB7laba \xE9s un cop de veu. El nombre de lletres no determina el nombre de s\xEDl\xB7labes. Els d\xEDgrafs ll i ny es mantenen junts; en mots com cotxe i platja, tx i tj es reparteixen entre dues s\xEDl\xB7labes. Cal tenir en compte els diftongs i els hiats." }),
      /* @__PURE__ */ jsx3("p", { children: "Practiquem la divisi\xF3 sil\xB7l\xE0bica de paraules a\xEFllades. La partici\xF3 a final de ratlla t\xE9 restriccions addicionals: no \xE9s el mateix exercici. Les separacions importades les ha de revisar el docent." }),
      /* @__PURE__ */ jsxs3("p", { children: [
        "Fonts: ",
        /* @__PURE__ */ jsx3("a", { href: "https://www.cpnl.cat/gramatica/39/15-les-sil-labes", target: "_blank", rel: "noopener noreferrer", children: "CPNL \xB7 Les s\xEDl\xB7labes" }),
        " \xB7 ",
        /* @__PURE__ */ jsx3("a", { href: "https://www.cpnl.cat/gramatica/32/16-la-separacio-de-sil-labes-amb-diftongs-i-hiats", target: "_blank", rel: "noopener noreferrer", children: "CPNL \xB7 Diftongs i hiats" })
      ] })
    ] })
  ] });
}

// tests/vocabulary-import.tsx
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
var memory = /* @__PURE__ */ new Map();
globalThis.localStorage = { getItem: (k) => memory.get(k) || null, setItem: (k, v) => memory.set(k, v), removeItem: (k) => memory.delete(k) };
var bag = { word: "motxilla", syllables: ["mot", "xi", "lla"] };
assert.deepEqual(validateWord({ word: "  MOTXILLA ", syllables: ["MOT", "XI", "LLA"] }), bag);
assert.throws(() => parseVocabularyText("{bad"), /JSON/);
assert.throws(() => parseVocabularyText("x".repeat(1000001)), /MB/);
for (const bad of [null, [], {}, vocabularyDocument([]), { ...vocabularyDocument([bag]), language: "es" }, vocabularyDocument([{ word: "casa", syllables: ["ca", "zza"] }]), vocabularyDocument([bag, bag]), vocabularyDocument([{ word: "<img>", syllables: ["<img>"] }]), vocabularyDocument([{ word: "abc", syllables: [2] }]), vocabularyDocument([{ word: "x", syllables: Array(9).fill("x") }])]) assert.throws(() => parseVocabulary(bad));
var many = Array.from({ length: 500 }, (_, i) => {
  const word = "xx" + String.fromCharCode(97 + Math.floor(i / 26)) + String.fromCharCode(97 + i % 26);
  return { word, syllables: [word] };
});
assert.equal(parseVocabulary(vocabularyDocument([...vocabulary, ...many])).length, vocabulary.length + 500);
assert.equal(mergeVocabulary(vocabulary, [], [vocabulary[0]]).added, 0);
assert.throws(() => mergeVocabulary(vocabulary, [], [{ word: "casa", syllables: ["cas", "a"] }]), /diferent/);
assert.throws(() => mergeVocabulary([], Array.from({ length: 500 }, (_, i) => ({ word: "w" + i, syllables: ["x"] })), [bag]), /500/);
var tree;
await act(() => {
  tree = create(/* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx4(Words, {}),
    /* @__PURE__ */ jsx4(Syllables, {})
  ] }));
});
assert.equal(getVocabularySnapshot().words.length, vocabulary.length);
await act(() => addVocabulary(parseVocabulary(vocabularyDocument([bag]))));
assert.equal(getVocabularySnapshot().words.length, vocabulary.length + 1);
assert.equal(JSON.parse(memory.get(VOCABULARY_KEY)).words[0].word, "motxilla");
assert.equal(tree.root.findAllByType("article").length, vocabulary.length + 1);
var lab = () => tree.root.findByType(Syllables);
await act(() => lab().findAllByType("select")[0].props.onChange({ target: { value: "custom" } }));
assert.equal(lab().findByProps({ className: "syllable-word" }).children.join(""), "MOTXILLA");
var button = (root, name) => root.findAllByType("button").find((b) => b.children.filter((x) => typeof x === "string" || typeof x === "number").join("").trim() === name);
await act(() => button(lab(), "3").props.onClick());
assert.equal(lab().findByProps({ role: "status" }).children.join(""), "MOLT B\xC9!");
await act(() => button(lab(), "Paraula seg\xFCent \u2192").props.onClick());
assert.equal(lab().findByProps({ role: "status" }).children.join(""), "Tria una resposta.");
var previous = getVocabularySnapshot();
assert.throws(() => addVocabulary([{ word: "nou", syllables: ["nou"] }, { word: "casa", syllables: ["cas", "a"] }]), /diferent/);
assert.strictEqual(getVocabularySnapshot(), previous);
await act(() => removeVocabulary("motxilla"));
assert.equal(getVocabularySnapshot().words.length, vocabulary.length);
assert.equal(memory.has(VOCABULARY_KEY), false);
assert(lab().findByProps({ role: "status" }).children.join("").includes("No hi ha"));
await act(() => addVocabulary([bag]));
assert.equal(lab().findByProps({ role: "status" }).children.join(""), "Tria una resposta.");
await act(() => {
  tree.unmount();
});
removeVocabulary("motxilla");
globalThis.localStorage.setItem = () => {
  throw Error("blocked");
};
addVocabulary([bag]);
assert.equal(getVocabularySnapshot().custom.length, 1);
assert(getVocabularySnapshot().warning.includes("no permet desar"));
console.log("PASS: strict schema, size/entry/duplicate/conflict checks, atomic import, shared live UI, persistence, removal, question reset and blocked-storage fallback.");
