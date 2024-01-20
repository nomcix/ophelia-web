document.addEventListener('DOMContentLoaded', function () {
    const categories = [
        "anxiety", "change", "confidence", "gratitude", "grief", "health",
        "heartbreak", "love", "mindfulness", "motivation", "personal growth",
        "positivity", "self love", "sleep", "wealth", "weightloss"
    ];
    
    const categoryContainer = document.querySelector('.category-container');
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.classList.add('category-button');
        button.onclick = function () {
            document.getElementById('affirmationPrompt').value = category;
        };
        categoryContainer.appendChild(button);
    });

    const generateButton = document.getElementById('generateButton');
    const affirmationText = document.getElementById('affirmationText');
    const affirmationPromptInput = document.getElementById('affirmationPrompt');
    const loading = document.getElementById('loading');

    generateButton.addEventListener('click', function () {
        const promptText = affirmationPromptInput.value.trim();
        const card = document.querySelector('.card-view');
    
        if (!promptText) {
            alert('Please enter a topic or select a tag');
            return;
        }
    
        // Construct the prompt
        const fullPrompt = `Generate a brief affirmation for someone looking for help with ${promptText}. Ensure the response is an affirmation, not advice, and valid JSON with a single property named affirmation. An affirmation is something like: I am strong and can make it through tough times, or I am capable of moving on from heartbreak etc`;
    
        // Show loading
        card.style.display = 'none'; // Hide the card view while loading
        loading.style.display = 'block'; // Display the loading spinner
    
        // Setup the request
        fetch('http://localhost:5013/affirmations/generate-single', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                prompt: fullPrompt,
                generateTts: false
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the data from the response
            loading.style.display = 'none'; // Hide the loading spinner
            card.style.display = "flex"; // Display the card view
            affirmationText.textContent = data.affirmation.affirmation; // Update the affirmation text
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loading.style.display = 'none'; // Hide the loading spinner on error
            card.style.display = 'block'; // Display the card view on error
            affirmationText.textContent = 'An error occurred. Please try again later.';
        });
    });
});
    


// document.addEventListener('DOMContentLoaded', function () {
//     // Automatically focus the input field when the page loads
//     document.getElementById('affirmationPrompt').focus();
    
//     // ... (rest of your JavaScript code) ...
// });



