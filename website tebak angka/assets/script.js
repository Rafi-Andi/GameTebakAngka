const localTotalMenangField = document.getElementById(
    "local-total-menang-field"
  );
  const localTerbanyakPercobaanField = document.getElementById(
    "local-terbanyak-percobaan-field"
  );
  const tombolHapusData = document.getElementById("hapus-data-button");
  const tombolMain = document.getElementById("tombol-main");
  const sebelumGame = document.getElementById("sebelum-game");
  const saatBermainGame = document.getElementById("saat-bermain-game");
  const setelahBermainGame = document.getElementById(
    "setelah-bermain-game"
  );
  const sessionPemainTebakanSalahField = document.getElementById(
    "session-pemain-tebakan-salah-field"
  );
  const tombol1 = document.getElementById("jawaban-1-tombol");
  const tombol2 = document.getElementById("jawaban-2-tombol");
  const tombol3 = document.getElementById("jawaban-3-tombol");

  const sessionPemainMenjawabField = document.getElementById(
    "session-pemain-menjawab-field"
  );
  const sessionPemainSalahMenjawabField = document.getElementById(
    "session-pemain-salah-menjawab-field"
  );
  const sessionPemainBenarMenjawabField = document.getElementById(
    "session-benar-menjawab-field"
  );

  function soal() {
    let answer = "123".split("");
    for (let i = 0; i < answer.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = answer[i];
      answer[i] = answer[j];
      answer[j] = tmp;
    }
    return answer.join("");
  }

  const sessionJawabanKey = "SESSION_JAWABAN";
  const sessionPemainTebakanSalahKey = "SESSION_PEMAIN_TEBAKAN_SALAH";
  const sessionPlayerSedangBermainKey = "PLAYER_SEDANG_BERMAIN";

  const localTotalMenangKey = "LOCAL_TOTAL_MENANG_KEY";
  const localTerbanyakTebakanSalahKey = "LOCAL_TERBANYAK_PERCOBAAN";

  window.addEventListener("load", function () {
    if (typeof Storage !== "undefined") {
      if (sessionStorage.getItem(sessionJawabanKey) === null) {
        sessionStorage.setItem(sessionJawabanKey, "");
      }
      if (sessionStorage.getItem(sessionPemainTebakanSalahKey) === null) {
        sessionStorage.setItem(sessionPemainTebakanSalahKey, 0);
      }
      if (localStorage.getItem(localTotalMenangKey) === null) {
        localStorage.setItem(localTotalMenangKey, 0);
      }
      if (localStorage.getItem(localTerbanyakTebakanSalahKey) === null) {
        localStorage.setItem(localTerbanyakTebakanSalahKey, 0);
      }
    } else {
      alert("browser anda tidak mendukung web storage");
    }

    sessionPemainTebakanSalahField.innerText = sessionStorage.getItem(sessionPemainTebakanSalahKey);
    localTotalMenangField.innerText = localStorage.getItem(localTotalMenangKey);
    localTerbanyakPercobaanField.innerText = localStorage.getItem(localTerbanyakTebakanSalahKey);
  });

  tombolMain.addEventListener('click', function(){
    sessionStorage.setItem(sessionJawabanKey, soal())
    sebelumGame.setAttribute('hidden', true)
    saatBermainGame.removeAttribute('hidden')
  })

  tombol1.addEventListener('click', function(){
    sessionPemainMenjawabField.innerText += '1';
    if (sessionPemainMenjawabField.innerText.length == 3){
      cekJawaban(sessionPemainMenjawabField.innerText)
    }
  })
  tombol2.addEventListener('click', function(){
    sessionPemainMenjawabField.innerText += '2';
    if (sessionPemainMenjawabField.innerText.length == 3){
      cekJawaban(sessionPemainMenjawabField.innerText)
    }
  })
  tombol3.addEventListener('click', function(){
    sessionPemainMenjawabField.innerText += '3';
    if (sessionPemainMenjawabField.innerText.length == 3){
      cekJawaban(sessionPemainMenjawabField.innerText)
    }
  })

  function cekJawaban(Player){
    const jawaban = sessionStorage.getItem(sessionJawabanKey);
    if (Player === jawaban){
      setelahBermainGame.removeAttribute('hidden')
      saatBermainGame.setAttribute('hidden', true)
      sessionPemainBenarMenjawabField.innerText = Player;
      updateSkore();
    } else {
      const kesempatanMenjawab = parseInt(sessionStorage.getItem(sessionPemainTebakanSalahKey))
      sessionStorage.setItem(sessionPemainTebakanSalahKey, kesempatanMenjawab + 1);
      sessionPemainTebakanSalahField.innerText = sessionStorage.getItem(sessionPemainTebakanSalahKey);
      sessionPemainMenjawabField.innerText = '';
      sessionPemainSalahMenjawabField.innerText = Player;
    }
  }

  function updateSkore(){
    const nilaiTebakanSalah = sessionStorage.getItem(sessionPemainTebakanSalahKey);
    const totalNilaiTebakanSalah = localStorage.getItem(localTerbanyakTebakanSalahKey);
    if (nilaiTebakanSalah > totalNilaiTebakanSalah){
      localStorage.setItem(localTerbanyakTebakanSalahKey, nilaiTebakanSalah)
      localTerbanyakPercobaanField.innerText = localStorage.getItem(localTerbanyakTebakanSalahKey);
    }

    const nilaiTebakanBenar = parseInt(localStorage.getItem(localTotalMenangKey));
    localStorage.setItem(localTotalMenangKey, nilaiTebakanBenar + 1);
    localTotalMenangField.innerText = localStorage.getItem(localTotalMenangKey);
  }

  window.addEventListener(BeforeUnloadEvent, function(){
    sessionPemainSalahMenjawabField.innerText = '';
    sessionPemainBenarMenjawabField.innerText = '';
    sessionStorage.setItem(sessionJawabanKey, '');
    sessionStorage.setItem(sessionPemainTebakanSalahKey, 0);
    sessionPemainTebakanSalahField.sessionStorage.getItem(sessionPemainTebakanSalahKey);
  })

  tombolHapusData.addEventListener('click', function(){
    sessionStorage.removeItem(sessionJawabanKey);
    sessionStorage.removeItem(sessionPlayerSedangBermainKey)
    sessionStorage.removeItem(sessionPemainTebakanSalahKey);
    localStorage.removeItem(localTotalMenangKey);
    localStorage.removeItem(localTerbanyakTebakanSalahKey);
    alert('refresh untuk menghapus data')
  })