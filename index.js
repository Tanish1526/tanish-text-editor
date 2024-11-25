document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const analysisOutput = document.getElementById('analysis-output');

    // Format text (bold, italic, underline)
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const action = event.target.innerText;

            if (action === 'Clear Formatting') {
                clearFormatting();
            } else if (['Bold', 'Italic', 'Underline'].includes(action)) {
                formatText(action.toLowerCase());
            } else if (['To camelCase', 'To snake_case', 'To PascalCase'].includes(action)) {
                convertText(action);
            } else if (action === 'Analyze Text') {
                analyzeText();
            }
        });
    });

    function formatText(command) {
        document.execCommand(command, false, null);
    }

    function clearFormatting() {
        textInput.value = textInput.value; // Reset the value to clear formatting
    }

    function convertText(action) {
        const input = textInput.value;
        let convertedText;

        switch (action) {
            case 'To camelCase':
                convertedText = input
                    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.trim().charAt(0).toUpperCase() + match.slice(1).toLowerCase())
                    .replace(/\s+/g, '');
                break;
            case 'To snake_case':
                convertedText = input
                    .trim() // Remove leading and trailing whitespace
                    .replace(/\s+/g, '_') // Replace spaces with underscores
                    .toLowerCase(); // Convert to lowercase
                break;
            case 'To PascalCase':
                convertedText = input
                    .replace(/\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
                    .replace(/\s+/g, ''); // Remove spaces
                break;
            default:
                convertedText = input;
        }

        textInput.value = convertedText;
    }

    function analyzeText() {
        const input = textInput.value;
        const wordCount = input.split(/\s+/).filter(word => word.length > 0).length;
        const charCount = input.length;
        const readingTime = Math.ceil(wordCount / 200); // Assuming average reading speed of 200 wpm

        analysisOutput.innerHTML = `
            <p>Word Count: ${wordCount}</p>
            <p>Character Count: ${charCount}</p>
            <p>Estimated Reading Time: ${readingTime} minute(s)</p>
        `;
    }
});