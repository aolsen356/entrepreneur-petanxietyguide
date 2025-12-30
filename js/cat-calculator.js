// Cat Anxiety Calculator - Pet Anxiety Guide
// Assesses cat anxiety and provides product recommendations

const questions = [
    {
        id: 1,
        question: "How does your cat react to changes in routine or environment?",
        options: [
            { text: "Adapts easily, unbothered", score: 0 },
            { text: "Takes a little time but adjusts", score: 1 },
            { text: "Shows noticeable stress (hiding, reduced appetite)", score: 2 },
            { text: "Extremely distressed, prolonged adjustment", score: 3 }
        ]
    },
    {
        id: 2,
        question: "How much does your cat hide during a normal day?",
        options: [
            { text: "Rarely hides, enjoys being around people", score: 0 },
            { text: "Hides occasionally, comes out regularly", score: 1 },
            { text: "Hides frequently throughout the day", score: 2 },
            { text: "Almost always hidden, rarely comes out", score: 3 }
        ]
    },
    {
        id: 3,
        question: "Does your cat over-groom or have bald patches?",
        options: [
            { text: "Normal grooming, healthy coat", score: 0 },
            { text: "Occasionally grooms more than usual", score: 1 },
            { text: "Noticeably excessive grooming", score: 2 },
            { text: "Compulsive grooming causing bald spots/skin issues", score: 3 }
        ]
    },
    {
        id: 4,
        question: "How does your cat react to visitors or strangers?",
        options: [
            { text: "Curious or friendly", score: 0 },
            { text: "Cautious but eventually appears", score: 1 },
            { text: "Hides until visitors leave", score: 2 },
            { text: "Extremely fearful, may act aggressively", score: 3 }
        ]
    },
    {
        id: 5,
        question: "Does your cat have litter box issues despite being trained?",
        options: [
            { text: "Always uses litter box properly", score: 0 },
            { text: "Rare accidents, usually explainable", score: 1 },
            { text: "Occasional accidents, seems stress-related", score: 2 },
            { text: "Frequent urination/defecation outside box", score: 3 }
        ]
    },
    {
        id: 6,
        question: "How is your cat's appetite and eating behavior?",
        options: [
            { text: "Consistent, healthy appetite", score: 0 },
            { text: "Sometimes picky or slightly reduced", score: 1 },
            { text: "Noticeably affected during stressful times", score: 2 },
            { text: "Severely impacted, refuses food when anxious", score: 3 }
        ]
    },
    {
        id: 7,
        question: "Does your cat exhibit aggressive behavior?",
        options: [
            { text: "Never aggressive, gentle temperament", score: 0 },
            { text: "Occasionally hisses but rarely acts out", score: 1 },
            { text: "Sometimes scratches/bites when stressed", score: 2 },
            { text: "Frequently aggressive, unpredictable", score: 3 }
        ]
    },
    {
        id: 8,
        question: "How does your cat respond to loud noises?",
        options: [
            { text: "Curious or unbothered", score: 0 },
            { text: "Alert but recovers quickly", score: 1 },
            { text: "Runs and hides, slow to return", score: 2 },
            { text: "Extremely terrified, prolonged hiding", score: 3 }
        ]
    },
    {
        id: 9,
        question: "Does your cat vocalize excessively (meowing, yowling)?",
        options: [
            { text: "Normal, appropriate vocalization", score: 0 },
            { text: "Slightly more vocal than average", score: 1 },
            { text: "Often vocalizes excessively, especially at night", score: 2 },
            { text: "Constant, distressing vocalization", score: 3 }
        ]
    },
    {
        id: 10,
        question: "Does your cat have difficulty relaxing or sleeping?",
        options: [
            { text: "Sleeps peacefully, relaxes easily", score: 0 },
            { text: "Occasionally restless", score: 1 },
            { text: "Often seems on edge, sleeps lightly", score: 2 },
            { text: "Rarely relaxed, always vigilant", score: 3 }
        ]
    }
];

// Product recommendations based on anxiety level
const products = {
    low: [
        {
            name: "Feliway Classic Diffuser",
            description: "Synthetic feline pheromone that helps cats feel calm and secure",
            link: "https://www.amazon.com/s?k=feliway+diffuser&tag=kcwd-20",
            price: "$25-35"
        }
    ],
    moderate: [
        {
            name: "HolistaPet CBD Cat Treats",
            description: "Organic CBD treats specially formulated for cats to reduce stress",
            link: "https://holistapet.com/shop/cbd-for-cats/cbd-cat-treats/",
            price: "$25-45",
            highlight: true
        },
        {
            name: "Feliway Multi-Cat Diffuser",
            description: "Calming pheromones for multi-cat households to reduce conflict",
            link: "https://www.amazon.com/s?k=feliway+multicat&tag=kcwd-20",
            price: "$30-40"
        }
    ],
    high: [
        {
            name: "HolistaPet CBD Oil for Cats",
            description: "Full-spectrum CBD oil designed specifically for feline anxiety relief",
            link: "https://holistapet.com/shop/cbd-for-cats/cbd-oil-for-cats/",
            price: "$30-70",
            highlight: true
        },
        {
            name: "Hemp My Pet CBD Cat Treats",
            description: "Premium organic CBD treats for cats with anxiety",
            link: "https://hempmypet.com/product-category/cats/",
            price: "$25-50",
            highlight: true
        },
        {
            name: "Honest Paws Calm CBD Bites for Cats",
            description: "Veterinarian-formulated CBD treats with calming herbs",
            link: "https://www.honestpaws.com/collections/cats",
            price: "$30-45",
            highlight: true
        }
    ],
    severe: [
        {
            name: "HolistaPet Complete Cat Calming Bundle",
            description: "CBD oil + treats bundle for comprehensive anxiety management",
            link: "https://holistapet.com/shop/cbd-for-cats/",
            price: "$50-100",
            highlight: true
        },
        {
            name: "Hemp My Pet CBD Oil + Treats Combo",
            description: "High-potency CBD products for cats with serious anxiety",
            link: "https://hempmypet.com/product-category/cats/",
            price: "$60-120",
            highlight: true
        },
        {
            name: "Veterinary Behaviorist Consultation",
            description: "Consider consulting a veterinary behaviorist for severe cases",
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
                class="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-secondary hover:bg-secondary/5 transition mb-3 focus:outline-none focus:border-secondary">
            ${opt.text}
        </button>
    `).join('');

    container.innerHTML = `
        <h2 class="text-xl font-semibold text-gray-900 mb-6">${q.question}</h2>
        <div class="space-y-2">
            ${optionsHtml}
        </div>
        ${currentQuestion > 0 ? `
            <button onclick="previousQuestion()" class="mt-6 text-gray-500 hover:text-secondary">
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
        description = "Wonderful! Your cat shows minimal signs of anxiety. They appear to be well-adjusted and comfortable in their environment.";
        productCategory = "low";
    } else if (percentage <= 40) {
        anxietyLevel = "Mild";
        levelColor = "text-yellow-600";
        description = "Your cat shows some mild anxiety symptoms. These can often be managed with calming products and environmental enrichment.";
        productCategory = "moderate";
    } else if (percentage <= 65) {
        anxietyLevel = "Moderate";
        levelColor = "text-orange-600";
        description = "Your cat is experiencing moderate anxiety. Consider CBD products and pheromone diffusers to help them feel more secure.";
        productCategory = "high";
    } else {
        anxietyLevel = "Severe";
        levelColor = "text-red-600";
        description = "Your cat is showing significant anxiety symptoms. We recommend trying CBD products and consulting with a veterinarian for a comprehensive treatment plan.";
        productCategory = "severe";
    }

    const scoreOutOf10 = Math.round((totalScore / maxScore) * 10);

    const recommendedProducts = products[productCategory];
    let productsHtml = recommendedProducts.map(p => `
        <div class="border ${p.highlight ? 'border-secondary bg-secondary/5' : 'border-gray-200'} rounded-lg p-4 mb-4">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-gray-900">${p.name}</h4>
                <span class="text-sm font-medium text-secondary">${p.price}</span>
            </div>
            <p class="text-gray-600 text-sm mb-3">${p.description}</p>
            <a href="${p.link}" target="_blank" rel="noopener"
               class="inline-block bg-secondary text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 transition">
                View Product
            </a>
        </div>
    `).join('');

    document.getElementById('quiz-container').classList.add('hidden');
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.classList.remove('hidden');

    resultsContainer.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Your Cat's Anxiety Assessment</h2>
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

        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recommended Products for Your Cat</h3>
        <div class="mb-6">
            ${productsHtml}
        </div>

        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <h4 class="font-semibold text-emerald-900 mb-2">Tips for Reducing Cat Anxiety</h4>
            <ul class="text-emerald-800 text-sm space-y-1">
                <li>- Provide plenty of vertical spaces and hiding spots</li>
                <li>- Maintain consistent feeding and play schedules</li>
                <li>- Use interactive toys for mental stimulation</li>
                <li>- Keep litter boxes clean and in quiet locations</li>
                ${percentage > 40 ? '<li>- Consider pheromone diffusers in main living areas</li>' : ''}
                ${percentage > 65 ? '<li>- Consult your veterinarian for severe symptoms</li>' : ''}
            </ul>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button onclick="retakeQuiz()" class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
                Retake Assessment
            </button>
            <a href="products.html" class="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition text-center">
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
