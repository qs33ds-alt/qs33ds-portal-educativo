export const topics={animals:'Animals',aula:'Aula',casa:'Casa',aliments:'Aliments',natura:'Natura',transport:'Transports',cos:'Cos',roba:'Roba',joc:'Jocs i música',persones:'Persones'} as const;
export type Topic=keyof typeof topics;
export type Word={word:string;syllables:string[];topic?:Topic;note?:string};
// Editorial bank. Segmentation is explicit; see REVISION_LINGUISTICA_V1_6.md.
export const vocabulary:Word[]=[
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
  "word": "mà",
  "syllables": [
   "mà"
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
  "note": "Els grups ai i gua es mantenen dins les seves síl·labes."
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
  "note": "El dígraf ll es manté junt."
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
  "word": "ànec",
  "syllables": [
   "à",
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
  "word": "ratolí",
  "syllables": [
   "ra",
   "to",
   "lí"
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
  "word": "dofí",
  "syllables": [
   "do",
   "fí"
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
  "word": "lleó",
  "syllables": [
   "lle",
   "ó"
  ],
  "topic": "animals",
  "note": "Les vocals e i ó formen un hiat: lle-ó."
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
  "word": "número",
  "syllables": [
   "nú",
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
  "word": "sofà",
  "syllables": [
   "so",
   "fà"
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
  "word": "coixí",
  "syllables": [
   "coi",
   "xí"
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
  "word": "sabó",
  "syllables": [
   "sa",
   "bó"
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
  "word": "arròs",
  "syllables": [
   "ar",
   "ròs"
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
  "word": "tomàquet",
  "syllables": [
   "to",
   "mà",
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
  "word": "plàtan",
  "syllables": [
   "plà",
   "tan"
  ],
  "topic": "aliments"
 },
 {
  "word": "síndria",
  "syllables": [
   "sín",
   "dri",
   "a"
  ],
  "topic": "aliments",
  "note": "Les vocals i i a finals formen un hiat: sín-dri-a."
 },
 {
  "word": "préssec",
  "syllables": [
   "prés",
   "sec"
  ],
  "topic": "aliments"
 },
 {
  "word": "raïm",
  "syllables": [
   "ra",
   "ïm"
  ],
  "topic": "aliments",
  "note": "La dièresi indica que a i ï es pronuncien en síl·labes diferents."
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
  "word": "núvol",
  "syllables": [
   "nú",
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
  "note": "El dígraf ny es manté junt."
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
  "word": "avió",
  "syllables": [
   "a",
   "vi",
   "ó"
  ],
  "topic": "transport",
  "note": "Les vocals i i ó pertanyen a síl·labes diferents."
 },
 {
  "word": "camió",
  "syllables": [
   "ca",
   "mi",
   "ó"
  ],
  "topic": "transport",
  "note": "Les vocals i i ó formen un hiat: ca-mi-ó."
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
  "word": "helicòpter",
  "syllables": [
   "he",
   "li",
   "còp",
   "ter"
  ],
  "topic": "transport"
 },
 {
  "word": "ambulància",
  "syllables": [
   "am",
   "bu",
   "làn",
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
  "word": "braç",
  "syllables": [
   "braç"
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
  "word": "mitjó",
  "syllables": [
   "mit",
   "jó"
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
  "word": "botó",
  "syllables": [
   "bo",
   "tó"
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
  "word": "cançó",
  "syllables": [
   "can",
   "çó"
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
  "note": "El grup gu no se separa; el grup rr sí."
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
  "word": "música",
  "syllables": [
   "mú",
   "si",
   "ca"
  ],
  "topic": "joc"
 }
];
export type Position='any'|'start'|'middle'|'end';
export function normalize(text:string){return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('ca').trim()}
export function matchesWritten(word:string,query:string,position:Position){const w=normalize(word),q=normalize(query);if(!q)return true;if(position==='start')return w.startsWith(q);if(position==='end')return w.endsWith(q);if(position==='middle'){for(let i=1;i+q.length<w.length;i++)if(w.slice(i,i+q.length)===q)return true;return false}return w.includes(q)}
