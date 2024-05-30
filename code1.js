// DOM içeriği yüklendiğinde bu fonksiyonu çalıştır
document.addEventListener("DOMContentLoaded", async function() {
    // Canvas elementini al
    const canvas = document.getElementById('kanvas');
    // 2D çizim bağlamını al
    const ctx = canvas.getContext('2d');

    // Top ve kutunun başlangıç pozisyonları
    let ballX = 350, ballY = 350, boxX = 50, boxY = 50;

    // Topu ve kutuyu canvas üzerinde çizme fonksiyonu
    function draw() {
        // Canvas'ı temizle
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Kutuyu çiz
        ctx.strokeRect(boxX, boxY, 300, 100);
        // Topu çiz
        ctx.beginPath();
        ctx.arc(ballX, ballY, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
    }

    // İlk çizim
    draw();

    // Topu kutuya taşıyan fonksiyon
    function moveBallToBox() {
        ballX = boxX + 100;
        ballY = boxY + 50;
        draw();
    }
    
    // Ses tanıma modelini yükle
    const recognizer = speechCommands.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    console.log("model yüklendi"); // Modelin yüklendiğini belirten mesaj

    // Sesli komutları dinlemeye başla
    recognizer.listen(result => {
        // En yüksek skorlu komutu belirle
        const command = recognizer.wordLabels()[result.scores.indexOf(Math.max(...result.scores))];
        // Komut 'yes' ise topu kutuya taşı
        if (command === 'yes') { 
            console.log("komut tespit edildi"); // Komutun tespit edildiğini belirten mesaj
            moveBallToBox();
        }
    }, { probabilityThreshold: 0.75 }); // Komut tanıma için olasılık eşiği
});