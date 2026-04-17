 
 const reasons = [
    { 
        text: "မမသဒ္ဒါလေးက အရမ်းးကြင်နာပြီးတော့ ချစ်စရာကောင်းတဲ့ အမျိုးသမီးလေးပါနော်ဗျ ကျွန်တော်တော့ အဲ့လိုအမျိုးသမီးလေးနဲ့ တွေ့ဆုံပေါင်းဖက်ခွင့်ရတာ အရမ်းးကံကောင်းတယ်လို့ခံစားမိပြီး ဝမ်းသာမိပါတယ်ဗျ။ ✨🤍", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "မမနဲ့ရှိရတာက ကျွန်တော့်ကိုအများကြီးပျော်ရွှင်စေပါတယ်နော် ဒီနှစ်လည်း ပိုပျော်ရွှင်ပြီး အမှတ်တရတွေအများကြီးနဲ့ မွေးနေ့လေးကိုပိုင်ဆိုင်နိုင်ပါစေဗျ။ နေ့ရက်တိုင်းကို ပျော်ရွှင်မှုတွေအများကြီးနဲ့ ဖြတ်သန်းနိုင်ပါစေနော်မမ။ 🫶🏻🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "မမသဒ္ဒါကလေးက ကျွန်တော်ချစ်တဲ့အမျိုးသမီးလေးတင်မကပဲ ကျွန်တော်ကိုယ်တိုင်လုပ်ယူစရာမလိုပဲတောင် ကျွန်တော့်နေ့ရက်လေးတွေကို ပိုမိုကောင်းမွန်အောင်ပြုလုပ်ပေးတဲ့ အမျိုးသမီးလေးဆိုလည်းမမှားပါဘူးနော်ဗျ။ 😼", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "ခုချိန်ထိလည်း ကိုယ့်မမသဒ္ဒါကလေးဟာ ကျွန်တော့်ရဲ့အချစ်ဆုံး အမျိုးသမီးလေးဖြစ်နေစဲပါပဲနော်ဗျ အရာအားလုံးအဆင်ပြေမှုတွေနဲ့ပဲကြုံတွေ့ပြီး ‌ဖြစ်ချင်တာမှန်သမျှ ဖြစ်မြှောက်ပါစေလိုဆုတောင်းပေးလိုက်ပါတယ်ခင်ဗျာ ပျော်ရွှင်စရာအကောင်းဆုံး နှစ်တစ်နှစ်ကိုပိုင်ဆိုင်နိုင်ပါစေနော်မမ။ 💝 ", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];


let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;


function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}


function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        
        reasonCounter.textContent = `${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

      
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = " Click here to continue~💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; 
                            }
                        });
                    });
                }
            });
        }

       
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        
        window.location.href = "#storylane";
        
    }
}


shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});


function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🌼', '🫶'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}


const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});


setInterval(createFloatingElement, 2000);