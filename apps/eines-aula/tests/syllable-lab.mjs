// tests/syllable-lab.tsx
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
import { useId, useMemo, useState } from "react";

// src/data/vocabularyStore.ts
import { useSyncExternalStore } from "react";

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

// src/modules/Syllables.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function SyllableQuestion({ item, index, total, next, previous, mode, uppercase }) {
  const [answer, setAnswer] = useState(null), [revealed, setRevealed] = useState(false), [cuts, setCuts] = useState([]), [order, setOrder] = useState([]), [result, setResult] = useState(null);
  const [tokens] = useState(() => shuffledIndices(item.syllables.length));
  const show = (s) => uppercase ? s.toLocaleUpperCase("ca") : s;
  const letters2 = Array.from(item.word);
  function check() {
    setResult(mode === "split" ? correctBoundaries(item, cuts) : correctOrder(item, order));
  }
  return /* @__PURE__ */ jsxs("section", { className: "syllable-question", children: [
    /* @__PURE__ */ jsxs("div", { className: "tool-top", children: [
      /* @__PURE__ */ jsx("span", { children: "SEPARACI\xD3 SIL\xB7L\xC0BICA" }),
      /* @__PURE__ */ jsxs("span", { className: "micro-tag", children: [
        index + 1,
        " / ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { children: mode === "count" ? "Digues la paraula i fes una picada de mans per cada s\xEDl\xB7laba." : mode === "split" ? "Marca els l\xEDmits entre les s\xEDl\xB7labes. Si nom\xE9s en t\xE9 una, no marquis cap tall." : "Tria les s\xEDl\xB7labes en l\u2019ordre correcte per formar la paraula." }),
    /* @__PURE__ */ jsx("div", { className: "syllable-word", children: show(item.word) }),
    mode === "count" ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: "QUANTES S\xCDL\xB7LABES T\xC9?" }),
      /* @__PURE__ */ jsx("div", { className: "timer-actions", children: Array.from({ length: Math.max(4, item.syllables.length) }, (_, i) => i + 1).map((n) => /* @__PURE__ */ jsx("button", { className: answer === n ? "action primary" : "action", "aria-pressed": answer === n, onClick: () => {
        setAnswer(n);
        setResult(n === item.syllables.length);
      }, children: n }, n)) })
    ] }) : mode === "split" ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "letter-boundaries", role: "group", "aria-label": "L\xEDmits entre s\xEDl\xB7labes", children: letters2.map((letter, i) => /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("b", { children: show(letter) }),
        i < letters2.length - 1 && /* @__PURE__ */ jsx("button", { className: cuts.includes(i + 1) ? "cut chosen" : "cut", "aria-label": `Separa despr\xE9s de ${letters2.slice(0, i + 1).join("")} (posici\xF3 ${i + 1})`, "aria-pressed": cuts.includes(i + 1), onClick: () => {
          setCuts((c) => c.includes(i + 1) ? c.filter((n) => n !== i + 1) : [...c, i + 1]);
          setResult(null);
        }, children: cuts.includes(i + 1) ? "|" : "\uFF0B" })
      ] }, i)) }),
      /* @__PURE__ */ jsx("button", { className: "action primary", onClick: check, children: "Comprova la separaci\xF3" }),
      /* @__PURE__ */ jsx("button", { className: "action", onClick: () => {
        setCuts([]);
        setResult(null);
      }, children: "Esborra els talls" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "assembled-word", "aria-label": "S\xEDl\xB7labes ordenades", children: order.length ? order.map((i) => /* @__PURE__ */ jsx("span", { children: show(item.syllables[i]) }, i)) : /* @__PURE__ */ jsx("span", { children: "Tria la primera s\xEDl\xB7laba." }) }),
      /* @__PURE__ */ jsx("div", { className: "syllable-parts", children: tokens.map((i) => /* @__PURE__ */ jsx("button", { className: "action", disabled: order.includes(i), onClick: () => {
        setOrder((o) => [...o, i]);
        setResult(null);
      }, children: show(item.syllables[i]) }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "timer-actions", children: [
        /* @__PURE__ */ jsx("button", { className: "action primary", disabled: order.length !== item.syllables.length, onClick: check, children: "Comprova l\u2019ordre" }),
        /* @__PURE__ */ jsx("button", { className: "action", disabled: !order.length, onClick: () => {
          setOrder((o) => o.slice(0, -1));
          setResult(null);
        }, children: "Desf\xE9s l\u2019\xFAltima s\xEDl\xB7laba" }),
        /* @__PURE__ */ jsx("button", { className: "action", onClick: () => {
          setOrder([]);
          setResult(null);
        }, children: "Torna a ordenar" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "syllable-feedback", role: "status", children: result === null ? mode === "count" ? "Tria una resposta." : "Prepara la resposta i comprova-la." : result ? "MOLT B\xC9!" : "TORNA-HO A PROVAR. POTS CONSULTAR LA SOLUCI\xD3." }),
    revealed && /* @__PURE__ */ jsxs("div", { className: "syllable-solution", children: [
      /* @__PURE__ */ jsx("div", { className: "syllable-parts", "aria-label": "Separaci\xF3 sil\xB7l\xE0bica", children: item.syllables.map((s, i) => /* @__PURE__ */ jsx("span", { children: show(s) }, i)) }),
      /* @__PURE__ */ jsxs("p", { children: [
        item.syllables.length,
        " ",
        item.syllables.length === 1 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes",
        item.note ? ` \xB7 ${item.note}` : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "timer-actions", children: [
      /* @__PURE__ */ jsx("button", { className: "action", onClick: () => setRevealed((r) => !r), children: revealed ? "Amaga les s\xEDl\xB7labes" : "Mostra les s\xEDl\xB7labes" }),
      /* @__PURE__ */ jsx("button", { className: "action", onClick: previous, children: "\u2190 Paraula anterior" }),
      /* @__PURE__ */ jsx("button", { className: "action primary", onClick: next, children: "Paraula seg\xFCent \u2192" })
    ] })
  ] });
}
function Syllables() {
  const id = useId(), bank = useVocabulary();
  const [source, setSource] = useState("all"), [index, setIndex] = useState(0), [mode, setMode] = useState("count"), [count, setCount] = useState("all"), [topic, setTopic] = useState("all"), [uppercase, setUppercase] = useState(true);
  const words = useMemo(() => {
    const pool = source === "custom" ? bank.custom : source === "base" ? vocabulary : bank.words;
    return pool.filter((w) => (count === "all" || w.syllables.length === Number(count)) && (topic === "all" || w.topic === topic));
  }, [bank, source, count, topic]);
  const current = index % Math.max(1, words.length), item = words[current];
  return /* @__PURE__ */ jsxs("div", { className: "tool-surface", children: [
    /* @__PURE__ */ jsxs("div", { className: "syllable-controls form-grid", children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: id + "source", children: [
        "Paraules de l\u2019activitat",
        /* @__PURE__ */ jsxs("select", { id: id + "source", value: source, onChange: (e) => {
          setSource(e.target.value);
          setIndex(0);
        }, children: [
          /* @__PURE__ */ jsx("option", { value: "all", children: "Tot el banc compartit" }),
          /* @__PURE__ */ jsx("option", { value: "base", children: "Banc inicial revisat" }),
          /* @__PURE__ */ jsx("option", { value: "custom", children: "Nom\xE9s personalitzades" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { htmlFor: id + "mode", children: [
        "Activitat",
        /* @__PURE__ */ jsxs("select", { id: id + "mode", value: mode, onChange: (e) => setMode(e.target.value), children: [
          /* @__PURE__ */ jsx("option", { value: "count", children: "Compta les s\xEDl\xB7labes" }),
          /* @__PURE__ */ jsx("option", { value: "split", children: "Marca la separaci\xF3" }),
          /* @__PURE__ */ jsx("option", { value: "order", children: "Ordena les s\xEDl\xB7labes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { htmlFor: id + "count", children: [
        "Nombre de s\xEDl\xB7labes",
        /* @__PURE__ */ jsxs("select", { id: id + "count", value: count, onChange: (e) => {
          setCount(e.target.value);
          setIndex(0);
        }, children: [
          /* @__PURE__ */ jsx("option", { value: "all", children: "Qualsevol" }),
          Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ jsxs("option", { value: i + 1, children: [
            i + 1,
            " ",
            i === 0 ? "s\xEDl\xB7laba" : "s\xEDl\xB7labes"
          ] }, i))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { htmlFor: id + "topic", children: [
        "Tema",
        /* @__PURE__ */ jsxs("select", { id: id + "topic", value: topic, onChange: (e) => {
          setTopic(e.target.value);
          setIndex(0);
        }, children: [
          /* @__PURE__ */ jsx("option", { value: "all", children: "Qualsevol tema" }),
          Object.entries(topics).map(([key, label]) => /* @__PURE__ */ jsx("option", { value: key, children: label }, key))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "syllable-toolbar", children: [
      /* @__PURE__ */ jsxs("label", { children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: uppercase, onChange: (e) => setUppercase(e.target.checked) }),
        " Mostra les paraules en maj\xFAscules"
      ] }),
      /* @__PURE__ */ jsx("button", { className: "action", disabled: !words.length, onClick: () => setIndex((i) => words.length > 1 ? i + 1 + Math.floor(Math.random() * (words.length - 1)) : i + 1), children: "Tria una paraula a l\u2019atzar" }),
      /* @__PURE__ */ jsx("button", { className: "action", onClick: () => {
        setCount("all");
        setTopic("all");
        setSource("all");
        setIndex(0);
      }, children: "Neteja els filtres" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "hint", children: [
      words.length,
      " ",
      words.length === 1 ? "paraula disponible" : "paraules disponibles",
      " amb aquests filtres \xB7 ",
      vocabulary.length,
      " al banc inicial."
    ] }),
    item ? /* @__PURE__ */ jsx(SyllableQuestion, { item, index: current, total: words.length, uppercase, mode, next: () => setIndex((i) => i + 1), previous: () => setIndex((i) => i === 0 ? words.length - 1 : i - 1) }, [source, mode, count, topic, index, item.word, item.syllables.join("|")].join(":")) : /* @__PURE__ */ jsx("p", { role: "status", children: "No hi ha paraules amb aquests filtres. Neteja\u2019ls o importa paraules des del Banc de paraules." }),
    /* @__PURE__ */ jsxs("details", { className: "syllable-guide", children: [
      /* @__PURE__ */ jsx("summary", { children: "Orientacions i criteris ling\xFC\xEDstics" }),
      /* @__PURE__ */ jsx("p", { children: "Una s\xEDl\xB7laba \xE9s un cop de veu. El nombre de lletres no determina el nombre de s\xEDl\xB7labes. Els d\xEDgrafs ll i ny es mantenen junts; en mots com cotxe i platja, tx i tj es reparteixen entre dues s\xEDl\xB7labes. Cal tenir en compte els diftongs i els hiats." }),
      /* @__PURE__ */ jsx("p", { children: "Practiquem la divisi\xF3 sil\xB7l\xE0bica de paraules a\xEFllades. La partici\xF3 a final de ratlla t\xE9 restriccions addicionals: no \xE9s el mateix exercici. Les separacions importades les ha de revisar el docent." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Fonts: ",
        /* @__PURE__ */ jsx("a", { href: "https://www.cpnl.cat/gramatica/39/15-les-sil-labes", target: "_blank", rel: "noopener noreferrer", children: "CPNL \xB7 Les s\xEDl\xB7labes" }),
        " \xB7 ",
        /* @__PURE__ */ jsx("a", { href: "https://www.cpnl.cat/gramatica/32/16-la-separacio-de-sil-labes-amb-diftongs-i-hiats", target: "_blank", rel: "noopener noreferrer", children: "CPNL \xB7 Diftongs i hiats" })
      ] })
    ] })
  ] });
}

// tests/syllable-lab.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
assert.equal(vocabulary.length, 177);
assert.equal(new Set(vocabulary.map((w) => w.word)).size, 177);
for (const item of vocabulary) {
  assert.equal(item.syllables.join(""), item.word);
  assert(item.topic && topics[item.topic]);
  assert(item.syllables.every((s) => /[aeiouàèéíòóúïü]/u.test(s)));
  assert(correctBoundaries(item, boundaries(item)));
  assert(correctOrder(item, item.syllables.map((_, i) => i)));
  assert(!correctOrder(item, []));
  const random = shuffledIndices(item.syllables.length);
  assert.equal(new Set(random).size, item.syllables.length);
  assert(random.every((i) => i >= 0 && i < item.syllables.length));
}
for (const [word, expected] of [["cotxe", ["cot", "xe"]], ["platja", ["plat", "ja"]], ["pissarra", ["pis", "sar", "ra"]], ["cami\xF3", ["ca", "mi", "\xF3"]], ["ra\xEFm", ["ra", "\xEFm"]], ["iogurt", ["io", "gurt"]], ["s\xEDndria", ["s\xEDn", "dri", "a"]], ["ambul\xE0ncia", ["am", "bu", "l\xE0n", "ci", "a"]]]) assert.deepEqual(vocabulary.find((w) => w.word === word).syllables, expected);
for (const item of vocabulary) {
  const cuts = boundaries(item);
  for (const match of item.word.matchAll(/ll|ny/gu)) {
    assert(!cuts.includes(match.index + 1), `No s\u2019ha de separar ${match[0]} a ${item.word}`);
  }
  for (const match of item.word.matchAll(/rr|ss|tg|tj|tx/gu)) {
    if (match.index > 0 && match.index + 2 < item.word.length) assert(cuts.includes(match.index + 1), `Cal revisar ${match[0]} a ${item.word}`);
  }
}
var casa = vocabulary[0];
assert.deepEqual(boundaries(casa), [2]);
assert(!correctBoundaries(casa, [1, 2]));
assert(!correctOrder(casa, [1, 0]));
assert(!correctOrder(casa, [0, 0]));
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
var lab;
await act(() => {
  lab = create(/* @__PURE__ */ jsx2(Syllables, {}));
});
var selects = () => lab.root.findAllByType("select");
var button = (name) => lab.root.findAllByType("button").find((b) => b.children.filter((c) => typeof c === "string" || typeof c === "number").join("").trim() === name);
await act(() => selects()[1].props.onChange({ target: { value: "split" } }));
await act(() => button("Comprova la separaci\xF3").props.onClick());
assert(lab.root.findByProps({ role: "status" }).children.join("").includes("TORNA"));
await act(() => lab.root.findAllByType("button").find((b) => b.props["aria-label"] === "Separa despr\xE9s de ca (posici\xF3 2)").props.onClick());
await act(() => button("Comprova la separaci\xF3").props.onClick());
assert.equal(lab.root.findByProps({ role: "status" }).children.join(""), "MOLT B\xC9!");
await act(() => selects()[1].props.onChange({ target: { value: "order" } }));
await act(() => button("SA").props.onClick());
await act(() => button("CA").props.onClick());
await act(() => button("Comprova l\u2019ordre").props.onClick());
assert(lab.root.findByProps({ role: "status" }).children.join("").includes("TORNA"));
await act(() => button("Torna a ordenar").props.onClick());
await act(() => button("CA").props.onClick());
await act(() => button("SA").props.onClick());
await act(() => button("Comprova l\u2019ordre").props.onClick());
assert.equal(lab.root.findByProps({ role: "status" }).children.join(""), "MOLT B\xC9!");
await act(() => selects()[2].props.onChange({ target: { value: "1" } }));
assert(lab.root.findByProps({ className: "syllable-word" }));
await act(() => selects()[3].props.onChange({ target: { value: "persones" } }));
assert(lab.root.findByProps({ role: "status" }).children.join("").includes("No hi ha"));
await act(() => button("Neteja els filtres").props.onClick());
assert.equal(lab.root.findByProps({ className: "syllable-word" }).children.join(""), "CASA");
await act(() => lab.root.findByType("input").props.onChange({ target: { checked: false } }));
assert.equal(lab.root.findByProps({ className: "syllable-word" }).children.join(""), "casa");
await act(() => lab.unmount());
console.log("PASS: 177 entries, explicit normative edge cases, all boundaries/order identities, split/order feedback, count/topic filters, empty state and lowercase.");
