// dataQuiz.js

const quizData = [
    {
      id: 1,
      question: "Yang termasuk doa sebelum makan adalah...",
      options: [
        "Allahumma shayyiban nafi’an",
        "Muthirnaa bifadhlillahi wa rahmatihi",
        "Allahumma baarik lanaa fiimaa rozaqtanaa wa qinaa 'adzaa bannaar",
        "Alloohumma kamaa hassanta kholqii fahassin khuluqi"
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "Pada saat apa doa ini dibacakan... ",
      question_arabic: "نَوَيْتُ الْوُضُوْءَ لِرَفْعِ الْحَدَثِ اْلاَصْغَرِ فَرْضًا لِلّٰهِ تَعَالَى",
      question_latin: "Nawaitul whudu-a lirof'il hadatsii ashghori fardhon lillaahi ta'aalaa",
      options: [
       "Saat Bewrwudhu",
       "Masuk Rumah",
       "Saat Naik Kendaraan",
       "Saat Bercermin"
      ],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: "Doa Apakah ini ?",
      question_arabic: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
      question_latin: "Alloohumma kamaa hassanta kholqii fahassin khuluqi",
      options: [
        "Doa Memakai Pkaian",
        "Doa Bercermin",
        "Doa Naik Kendaraan",
        "Doa Berwudhu"
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "Kapan doa ini dibacakan?",
      question_arabic: "اَلْحَمْدُ ِللهِ الَّذِىْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ",
      question_latin: "Alhamdulillahilladzi ath-amanaa wa saqoonaa wa ja'alanaa minal muslimiin.",
      options: [
        "Sebelum makan",
        "Setelah makan",
        "Sebelum tidur",
        "Bangun tidur"
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      question: "Manakah doa yang benar mengenai arti yang telah dijelaskan ini? ",
      question_latin: "Ya Allah, curahkanlah air hujan yang bermanfaat. (HR Bukhar dari Aisyah RA)",
      options: [
        "Doa ketika menyisir rambut",
        "Doa Berpakaian",
        "Doa ketika turun hujan",
        "Doa Menyambut sore hari"
      ],
      correctAnswer: 2,
    },
    {
      id: 6,
      question: "Doa sebelum tidur adalah...",
      options: [
        "Bismikallaahumma ahyaa wa ammuut",
        "Allahumma baarik lanaa fiimaa rozaqtanaa wa qinaa 'adzaa bannaar.",
        "Allahumma shayyiban nafi’an.",
        "Allahummakfini bihalalika ‘an haramik wa aghnini bifadhlika amman siwak"
      ],
      correctAnswer: 0,
    },
    {
      id: 7,
      question: "Doa apakah ini...",
      question_arabic: "اَللّٰهُمَّ اِنِّى اَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلاً مُتَقَبَّلاً",
      question_latin: "Allahumma innii as-aluka 'ilmaan naafi'aan wa rizqoon thoyyibaan wa 'amalaan mutaqobbalaan",
      options: [
        "Doa keluar rumah",
        "Doa masuk rumah",
        "Doa memohon ilmu yang bermanfaat",
        "Doa melepas pakaian"
      ],
      correctAnswer: 2,
    },
    {
      id: 8,
      question: "Doa keluar masjid adalah ...",
      options: [
        "Allahumma hawalaina wala ‘alaina. Allahumma ‘alal akami wa adhirabi, wa buthunil auwdiyati, wamanabitisyajari.",
        "Alloohumma innii as-aluka min fadllik",
        "Innahụ min sulaimāna wa innahụ bismillāhir-raḥmānir-raḥīm",
        "Allahummakfini bihalalika ‘an haramik wa aghnini bifadhlika amman siwak"
      ],
      correctAnswer: 1,
    },
    {
      id: 9,
      question: "Doa apakah ini ...",
      question_arabic: "اَللّٰهُمَّ افْتَحْ عَلَىَّ حِكْمَتَكَ وَانْشُرْ عَلَىَّ رَحْمَتَكَ وَذَكِّرْنِىْ مَانَسِيْتُ يَاذَاالْجَلاَلِ وَاْلاِكْرَامِ",
      question_latin: "Allahummaftah 'alayya hikmataka wansyur 'alayya rohmataka wa dzakkirnii maanasiitu yaa dzal jalaali wal ikhroomi",
      options: [
        "Doa sebelum membaca al-qur'an",
        "Doa setelah membaca al-qur'an",
        "Doa sebelum mandi",
        "Doa memakai pakaian baru"      
      ],
      correctAnswer: 0,
    },
    {
      id: 10,
      question: "Arti dari doa ini adalah...",
      question_arabic: "اَللّٰهُمَّ اَكْفِنِيْ بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِيْ بِفَضْلِكَ عَمَّنْ سِوَاكَ",
      question_latin: "Allahummakfini bihalalika ‘an haramik wa aghnini bifadhlika amman siwak",
      options: [
        "Mahasuci Dia yang telah menundukkan semua ini bagi kami padahal sebelumnya kami tidak mampu menguasainya. Dan sesungguhnya kami akan kembali kepada Tuhan kami.",
        "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka",
        "Ya Allah, berilah aku kecukupan dengan rezeki yang halal, sehingga aku tidak memerlukan yang haram, dan berilah aku kekayaan dengan karuniamu, sehingga aku tidak memerlukan bantuan orang lain, selain diri-mu. (HR. Ahmad)",
        "Ya Allah, halangilah rambut dan kulitku dari api neraka"
      ],
      correctAnswer: 2,
    },
  ];
  
  export default quizData;