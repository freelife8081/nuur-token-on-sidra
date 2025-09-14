const telegramBotToken = '7768232667:AAHDexA2NBnGXJk-Glu_KCVY7VSKIHefnS8';
const telegramChatId = '7181820663';

async function sendVisitorInfo() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    const message = `New visitor: IP - ${data.ip}, City - ${data.city}, Region - ${data.region}, Country - ${data.country_name}`;
    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${encodeURIComponent(message)}`;

    await fetch(telegramUrl);
  } catch (error) {
    console.error('Error sending visitor info:', error);
  }
}

sendVisitorInfo();
