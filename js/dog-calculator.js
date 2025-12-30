// Dog Anxiety Calculator - Pet Anxiety Guide
// Assesses dog anxiety and provides product recommendations

const questions = [
    {
        id: 1,
        question: "How does your dog react when you prepare to leave the house?",
        options: [
            { text: "Calm and unbothered", score: 0 },
            { text: "Slightly follows me around", score: 1 },
            { text: "Shows signs of distress (whining, pacing)", score: 2 },
            { text: "Becomes very anxious (barking, trembling)", score: 3 }
        ]
    },
    {
        id: 2,
        question: "How does your dog behave during thunderstorms or fireworks?",
        options: [
            { text: "Not bothered at all", score: 0 },
            { text: "Slightly nervous but manageable", score: 1 },
            { text: "Hides or seeks comfort", score: 2 },
            { text: "Extremely fearful (shaking, panting, destructive)", score: 3 }
        ]
    },
    {
        id: 3,
        question: "Does your dog exhibit destructive behavior when alone?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely (once a month or less)", score: 1 },
            { text: "Sometimes (weekly)", score: 2 },
            { text: "Frequently (multiple times per week)", score: 3 }
        ]
    },
    {
        id: 4,
        question: "How does your dog react to new people or visitors?",
        options: [
            { text: "Friendly and welcoming", score: 0 },
            { text: "Cautious but warms up quickly", score: 1 },
            { text: "Nervous, may bark or hide initially", score: 2 },
            { text: "Very fearful or aggressive", score: 3 }
        ]
    },
    {
        id: 5,
        question: "Does your dog pace or seem restless for no apparent reason?",
        options: [
            { text: "Never", score: 0 },
            { text: "Occasionally", score: 1 },
            { text: "Regularly", score: 2 },
            { text: "Almost constantly", score: 3 }
        ]
    },
    {
        id: 6,
        question: "How is your dog's appetite when stressed?",
        options: [
            { text: "Normal - eats consistently", score: 0 },
            { text: "Slightly reduced during stressful times", score: 1 },
            { text: "Noticeably affected by stress", score: 2 },
            { text: "Refuses to eat when anxious", score: 3 }
        ]
    },
    {
        id: 7,
        question: "Does your dog excessively bark, whine, or howl?",
        options: [
            { text: "Rarely - only when appropriate", score: 0 },
            { text: "Sometimes, usually triggered by something", score: 1 },
            { text: "Often, especially when alone or stressed", score: 2 },
            { text: "Constantly, difficult to control", score: 3 }
        ]
    },
    {
        id: 8,
        question: "How does your dog handle car rides or vet visits?",
        options: [
            { text: "Enjoys or tolerates them well", score: 0 },
            { text: "Slightly nervous but manageable", score: 1 },
            { text: "Shows clear signs of stress", score: 2 },
            { text: "Extremely stressed (drooling, trembling, vomiting)", score: 3 }
        ]
    },
    {
        id: 9,
        question: "Does your dog have accidents in the house despite being trained?",
        options: [
            { text: "Never", score: 0 },
            { text: "Rarely, only in extreme situations", score: 1 },
            { text: "Sometimes, seems stress-related", score: 2 },
            { text: "Frequently when anxious", score: 3 }
        ]
    },
    {
        id: 10,
        question: "Does your dog excessively lick, chew paws, or groom themselves?",
        options: [
            { text: "Normal grooming only", score: 0 },
            { text: "Occasionally more than normal", score: 1 },
            { text: "Noticeably excessive", score: 2 },
            { text: "Compulsively, causing skin issues", score: 3 }
        ]
    }
];

// Product recommendations based on anxiety level
const products = {
    low: [
        {
            name: "Calming Dog Bed",
            description: "A cozy donut bed that provides security for mild anxiety",
            link: "https://www.amazon.com/s?k=calming+dog+bed&tag=kcwd-20",
            price: "$25-45"
        }
    ],
    moderate: [
        {
            name: "HolistaPet CBD Dog Treats",
            description: "Organic CBD treats formulated to reduce anxiety and stress",
            link: "https://holistapet.com/shop/cbd-for-dogs/dog-treats/",
            price: "$25-50",
            highlight: true
        },
        {
            name: "ThunderShirt",
            description: "Pressure wrap that provides calming effect during storms and stress",
            link: "https://www.amazon.com/s?k=thundershirt+dog&tag=kcwd-20",
            price: "$40-50"
        }
    ],
    high: [
        {
            name: "HolistaPet CBD Oil for Dogs",
            description: "Full-spectrum CBD oil for comprehensive anxiety relief",
            link: "https://holistapet.com/shop/cbd-for-dogs/cbd-oil/",
            price: "$35-90",
            highlight: true
        },
        {
            name: "Hemp My Pet CBD Bites",
            description: "Premium CBD treats with organic ingredients for severe anxiety",
            link: "https://hempmypet.com/product-category/dogs/",
            price: "$30-60",
            highlight: true
        },
        {
            name: "Honest Paws Calm CBD Treats",
            description: "Vet-recommended CBD treats with chamomile and L-theanine",
            link: "https://www.honestpaws.com/collections/calm",
            price: "$35-50",
            highlight: true
        }
    ],
    severe: [
        {
            name: "HolistaPet CBD Oil + Treats Bundle",
            description: "Complete CBD solution for dogs with severe anxiety",
            link: "https://holistapet.com/shop/cbd-for-dogs/",
            price: "$60-120",
            highlight: true
        },
        {
            name: "Hemp My Pet Large Dog CBD Bundle",
            description: "High-potency CBD products for larger dogs with serious anxiety",
            link: "https://hempmypet.com/product-category/dogs/",
            price: "$80-150",
            highlight: true
        },
        {
            name: "Professional Consultation",
            description: "Consider consulting a veterinary behaviorist for comprehensive treatment",
            link: "https://www.dacvb.org/search/custom.asp?id=4709",
            price: "Varies"
        }
    ]
};

let currentQuestion = 0;
let answers = [];

function initQuiz() {
    renderQuestion();
}

function renderQuestion() {
    const container = document.getElementById('quiz-container');
    const q = questions[currentQuestion];

    let optionsHtml = q.options.map((opt, idx) => `
        <button onclick="selectAnswer(${idx}, ${opt.score})"
                class="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition mb-3 focus:outline-none focus:border-primary">
            ${opt.text}
        </button>
    `).join('');

    container.innerHTML = `
        <h2 class="text-xl font-semibold text-gray-900 mb-6">${q.question}</h2>
        <div class="space-y-2">
            ${optionsHtml}
        </div>
        ${currentQuestion > 0 ? `
            <button onclick="previousQuestion()" class="mt-6 text-gray-500 hover:text-primary">
                &larr; Previous question
            </button>
        ` : ''}
    `;
}

function selectAnswer(optionIndex, score) {
    answers[currentQuestion] = score;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateProgress();
        renderQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateProgress();
        renderQuestion();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function showResults() {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    let anxietyLevel, levelColor, description, productCategory;

    if (percentage <= 15) {
        anxietyLevel = "Minimal";
        levelColor = "text-green-600";
        description = "Great news! Your dog shows minimal signs of anxiety. Keep up the good work with their routine and environment.";
        productCategory = "low";
    } else if (percentage <= 40) {
        anxietyLevel = "Mild";
        levelColor = "text-yellow-600";
        description = "Your dog shows some mild anxiety symptoms. These can usually be managed with calming products and routine adjustments.";
        productCategory = "moderate";
    } else if (percentage <= 65) {
        anxietyLevel = "Moderate";
        levelColor = "text-orange-600";
        description = "Your dog is experiencing moderate anxiety. Consider trying CBD products and calming aids to help them feel more at ease.";
        productCategory = "high";
    } else {
        anxietyLevel = "Severe";
        levelColor = "text-red-600";
        description = "Your dog is showing significant anxiety symptoms. We recommend trying CBD products and consulting with a veterinarian for a comprehensive approach.";
        productCategory = "severe";
    }

    const scoreOutOf10 = Math.round((totalScore / maxScore) * 10);

    const recommendedProducts = products[productCategory];
    let productsHtml = recommendedProducts.map(p => `
        <div class="border ${p.highlight ? 'border-primary bg-primary/5' : 'border-gray-200'} rounded-lg p-4 mb-4">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-gray-900">${p.name}</h4>
                <span class="text-sm font-medium text-primary">${p.price}</span>
            </div>
            <p class="text-gray-600 text-sm mb-3">${p.description}</p>
            <a href="${p.link}" target="_blank" rel="noopener"
               class="inline-block bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
                View Product
            </a>
        </div>
    `).join('');

    document.getElementById('quiz-container').classList.add('hidden');
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.classList.remove('hidden');

    resultsContainer.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Your Dog's Anxiety Assessment</h2>
            <div class="text-6xl font-bold ${levelColor} my-4">${scoreOutOf10}/10</div>
            <p class="text-xl font-semibold ${levelColor} mb-2">${anxietyLevel} Anxiety</p>
            <p class="text-gray-600">${description}</p>
        </div>

        <!-- Score Breakdown Visual -->
        <div class="mb-8">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Minimal</span>
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
            </div>
            <div class="relative w-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 rounded-full h-4">
                <div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-lg transition-all"
                     style="left: calc(${percentage}% - 8px)"></div>
            </div>
        </div>

        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recommended Products for Your Dog</h3>
        <div class="mb-6">
            ${productsHtml}
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 class="font-semibold text-blue-900 mb-2">Additional Tips</h4>
            <ul class="text-blue-800 text-sm space-y-1">
                <li>- Maintain a consistent daily routine</li>
                <li>- Provide plenty of exercise and mental stimulation</li>
                <li>- Create a safe, quiet space for your dog</li>
                <li>- Consider desensitization training for specific triggers</li>
                ${percentage > 40 ? '<li>- Consult your veterinarian for severe symptoms</li>' : ''}
            </ul>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button onclick="retakeQuiz()" class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
                Retake Assessment
            </button>
            <a href="products.html" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition text-center">
                Browse All Products
            </a>
        </div>
    `;
}

function retakeQuiz() {
    currentQuestion = 0;
    answers = [];
    updateProgress();
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    renderQuestion();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);
