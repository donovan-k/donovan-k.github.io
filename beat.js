        window.addEventListener('DOMContentLoaded', (event) => {
            const audioElements = document.querySelectorAll('audio');
            const playButtons = document.querySelectorAll('.play-btn');
            const stopButton = document.getElementById('stop-btn');
            const shuffleButton = document.getElementById('shuffle-btn');
            const nextButton = document.getElementById('next-btn');
            const prevButton = document.getElementById('prev-btn');

            // Initialize the player with the first audio element
            let currentPlayer = audioElements[0];

            // Play the selected audio element
            function playAudio(audioElement) {
                audioElements.forEach((element) => {
                    if (element !== audioElement) {
                        element.pause();
                    }
                });
                audioElement.play();
                currentPlayer = audioElement;
            }

            // Add event listeners to play/pause buttons
            playButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    const audioElement = button.parentNode.querySelector('audio');
                    playAudio(audioElement);
                });
            });

            // Add event listener to stop button
            stopButton.addEventListener('click', () => {
                audioElements.forEach((element) => {
                    element.pause();
                    element.currentTime = 0;
                });
            });

            // Add event listener to shuffle button
            shuffleButton.addEventListener('click', () => {
                const shuffledAudioElements = Array.from(audioElements).sort(() => Math.random() - 0.5);
                playAudio(shuffledAudioElements[0]);
            });

            // Add event listener to next button
            nextButton.addEventListener('click', () => {
                const currentIndex = Array.from(audioElements).indexOf(currentPlayer);
                const nextIndex = (currentIndex + 1) % audioElements.length;
                playAudio(audioElements[nextIndex]);
            });

            // Add event listener to previous button
            prevButton.addEventListener('click', () => {
                const currentIndex = Array.from(audioElements).indexOf(currentPlayer);
                const prevIndex = (currentIndex - 1 + audioElements.length) % audioElements.length;
                playAudio(audioElements[prevIndex]);
            });
        });