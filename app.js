// Sample ingredient data with recipes
const recipesDatabase = {
    "tomato": {
        "name": "Tomato Soup",
        "steps": ["Chop tomatoes", "Cook tomatoes in a pot", "Blend the mixture", "Serve hot"],
        "image": "images/tomato.jpg"
    },
    "egg": {
        "name": "Egg Salad",
        "steps": ["Boil eggs", "Chop eggs", "Mix with mayonnaise", "Serve cold"],
        "image": "images/egg.jpg"
    },
    "cheese": {
        "name": "Cheese Pizza",
        "steps": ["Prepare dough", "Spread tomato sauce", "Add cheese", "Bake in oven"],
        "image": "images/cheesepizza.jpg"
    },
    "potato": {
        "name": "Mashed Potato",
        "steps": ["Boil potatoes", "Mash potatoes", "Add butter and milk", "Serve warm"],
        "image": "images/potato.jpg"
    },
    "chicken": {
        "name": "Grilled Chicken",
        "steps": ["Marinate chicken", "Preheat grill", "Grill chicken", "Serve with vegetables"],
        "image": "images/chicken.jpg"
    },
    "broccoli": {
        "name": "Steamed Broccoli",
        "steps": ["Wash broccoli", "Steam broccoli for 5-7 minutes", "Serve with a sprinkle of salt"],
        "image": "images/broccoli.jpg"
    },
    "carrot": {
        "name": "Carrot Soup",
        "steps": ["Chop carrots", "Cook carrots in a pot with broth", "Blend the mixture", "Serve hot"],
        "image": "images/carrot.jpg"
    },
    "beef": {
        "name": "Beef Stew",
        "steps": ["Brown beef in a pot", "Add vegetables and broth", "Simmer for 2 hours", "Serve hot"],
        "image": "images/beef.jpg"
    },
    "fish": {
        "name": "Baked Fish",
        "steps": ["Preheat oven to 375°F", "Season fish", "Bake for 20 minutes", "Serve with lemon"],
        "image": "images/fish.jpg"
    },
    "rice": {
        "name": "Fried Rice",
        "steps": ["Cook rice", "Stir-fry vegetables", "Add rice and soy sauce", "Serve hot"],
        "image": "images/rice.jpg"
    },
    "pasta": {
        "name": "Spaghetti Carbonara",
        "steps": ["Cook spaghetti", "Fry bacon", "Mix eggs and cheese", "Combine all and serve"],
        "image": "images/pasta.jpg",
        "video": "https://www.youtube.com/watch?v=4F1JcvnsBRc"
    },
    "spinach": {
        "name": "Spinach Salad",
        "steps": ["Wash spinach", "Mix with olive oil and lemon juice", "Serve fresh"],
        "image": "images/spinach.jpg",
        "video": "https://www.youtube.com/shorts/qeFMIFiklT4"
    },
    "strawberry": {
        "name": "Strawberry Smoothie",
        "steps": ["Wash strawberries", "Blend with yogurt and honey", "Serve chilled"],
        "image": "images/strawberry.jpg",
        "video": "https://www.youtube.com/watch?v=DZwPwj3jJsc"
    }
};

document.getElementById('search-button').addEventListener('click', function() {
    let ingredient = document.getElementById('ingredient-input').value.trim().toLowerCase();
    fetchRecipes(ingredient);
});

let recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;
recognition.interimResults = false;

recognition.onresult = function(event) {
    let speechResult = event.results[0][0].transcript.trim().toLowerCase();
    document.getElementById('voice-input-display').innerText = `You said: ${speechResult}`;
    document.getElementById('ingredient-input').value = speechResult;
    fetchRecipes(speechResult);
};

recognition.onerror = function(event) {
    console.error('Speech recognition error', event.error);
    alert("Error in speech recognition: " + event.error);
};

document.getElementById('speak-button').addEventListener('click', function() {
    recognition.start();
    document.getElementById('speak-button').style.display = 'none';
    document.getElementById('stop-button').style.display = 'inline';
});

document.getElementById('stop-button').addEventListener('click', function() {
    recognition.stop();
    document.getElementById('speak-button').style.display = 'inline';
    document.getElementById('stop-button').style.display = 'none';
});

// Clear history button functionality
document.getElementById('clear-history-button').addEventListener('click', function() {
    localStorage.removeItem('searchHistory');
    updateHistoryDisplay();
});

document.getElementById('view-history-button').addEventListener('click', function() {
    updateHistoryDisplay();
});

// Local storage handling for search history
function storeHistory(ingredient, recipes) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.push({ ingredient, recipes });
    localStorage.setItem('searchHistory', JSON.stringify(history));
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    let historyTable = document.getElementById('search-history');
    let tbody = historyTable.querySelector('tbody');
    tbody.innerHTML = '';  // Clear current history
    history.forEach(entry => {
        let row = tbody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.textContent = entry.ingredient;
        cell2.textContent = entry.recipes.join(", ");  // Assuming recipes is an array
    });
    historyTable.style.display = 'table';
}

function fetchRecipes(ingredient) {
    let recipe = recipesDatabase[ingredient];
    if (recipe) {
        updateResultsDisplay(ingredient, recipe);
        storeHistory(ingredient, [recipe.name]);
    } else {
        updateResultsDisplay(ingredient, { name: "No recipes found", steps: [], image: "" });
    }
}

function updateResultsDisplay(ingredient, recipe) {
    let resultsArea = document.getElementById('recipe-body');
    resultsArea.innerHTML = ''; // Clear previous results
    let row = resultsArea.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.textContent = ingredient;
    cell2.textContent = recipe.name;
    document.getElementById('download-button').style.display = 'block';

    // Update recipe details
    document.getElementById('recipe-name').innerText = recipe.name;
    const recipeImage = document.getElementById('recipe-image');
    recipeImage.src = recipe.image;
    recipeImage.style.display = 'block';

    const recipeSteps = document.getElementById('recipe-steps');
    recipeSteps.innerHTML = '';

    const recipeStepsHeader = document.createElement('h3');
    recipeStepsHeader.textContent = 'Recipe Steps';
    recipeSteps.appendChild(recipeStepsHeader);

    recipe.steps.forEach(step => {
        let li = document.createElement('li');
        li.textContent = step;
        recipeSteps.appendChild(li);
    });

    // Add video link if available
    if (recipe.video) {
        const videoLink = document.createElement('a');
        videoLink.href = recipe.video;
        videoLink.textContent = 'Watch video';
        videoLink.target = '_blank';
        videoLink.style.display = 'block';
        videoLink.style.marginTop = '10px';
        recipeSteps.appendChild(videoLink);
    }

    document.getElementById('recipe-details').style.display = 'block';
}

// Initialize camera and hand tracking
let model = null;
const videoElement = document.getElementById('video');
const canvas = document.getElementById('video-buffer');
const context = canvas.getContext('2d');
let isGestureRecognitionActive = false;
let mediaRecorder;
let recordedChunks = [];
let timerInterval;
let timerDisplay = document.createElement('span');

timerDisplay.id = 'timer-display';
timerDisplay.style.marginLeft = '20px';
timerDisplay.style.fontSize = '20px';
timerDisplay.style.color = 'red';
timerDisplay.style.fontWeight = 'bold';
document.getElementById('clear-history-button').insertAdjacentElement('afterend', timerDisplay);

document.getElementById('camera-button').addEventListener('click', function() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        stopRecording();
    } else {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                videoElement.srcObject = stream;
                videoElement.style.display = 'block';

                // Initialize MediaRecorder for video recording
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = function(event) {
                    if (event.data.size > 0) {
                        recordedChunks.push(event.data);
                    }
                };
                mediaRecorder.onstop = function() {
                    saveVideo();
                    clearInterval(timerInterval);
                    timerDisplay.style.display = 'none';  // Hide timer after recording stops
                    videoElement.srcObject.getTracks().forEach(track => track.stop());
                    videoElement.style.display = 'none';
                };
                mediaRecorder.start();
                document.getElementById('camera-button').textContent = 'Stop Camera';
                timerDisplay.style.display = 'inline';  // Show timer when recording starts
                startTimer();
            })
            .catch(function(error) {
                alert("Camera access denied: " + error.message);  // User friendly error message
            });
    }
});

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        document.getElementById('camera-button').textContent = 'Use Camera';
        clearInterval(timerInterval);
    }
}

function startTimer() {
    let startTime = Date.now();
    timerInterval = setInterval(function() {
        let elapsedTime = Date.now() - startTime;
        let minutes = Math.floor(elapsedTime / 60000);
        let seconds = Math.floor((elapsedTime % 60000) / 1000);
        timerDisplay.textContent = `Recording Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

document.getElementById('gesture-recognition-button').addEventListener('click', function() {
    if (!isGestureRecognitionActive) {
        startGestureRecognition();
    } else {
        stopGestureRecognition();
    }
});

function startGestureRecognition() {
    if (!model) {
        handTrack.load().then(lmodel => {
            model = lmodel;
            handTrack.startVideo(videoElement).then(status => {
                if (status) {
                    document.getElementById('gesture-recognition-button').textContent = 'Stop Gesture Recognition';
                    isGestureRecognitionActive = true;
                    canvas.style.display = 'block';
                    runDetection();
                } else {
                    console.log("Please enable video");
                }
            });
        });
    } else {
        document.getElementById('gesture-recognition-button').textContent = 'Stop Gesture Recognition';
        isGestureRecognitionActive = true;
        canvas.style.display = 'block';
        runDetection();
    }
}

function stopGestureRecognition() {
    document.getElementById('gesture-recognition-button').textContent = 'Gesture Recognition';
    isGestureRecognitionActive = false;
    canvas.style.display = 'none';
    context.clearRect(0, 0, canvas.width, canvas.height);
    handTrack.stopVideo(videoElement);
}

function runDetection() {
    if (isGestureRecognitionActive) {
        model.detect(videoElement).then(predictions => {
            model.renderPredictions(predictions, canvas, context, videoElement);
            handleGestures(predictions);
            requestAnimationFrame(runDetection);
        });
    }
}

function handleGestures(predictions) {
    let gesture = null;

    predictions.forEach(prediction => {
        const bbox = prediction.bbox;
        if (prediction.label === 'open') {
            if (bbox.length === 1) {
                gesture = "tomato";  // Single finger
            } else if (bbox.length === 2) {
                gesture = "egg";  // Two fingers
            } else if (bbox.length === 3) {
                gesture = "cheese";  // Three fingers
            } else if (bbox.length === 5) {
                gesture = "carrot";  // Hi-five
            }
        } else if (prediction.label === 'pinch') {
            gesture = "rice";  // Pinch gesture
        } else if (prediction.label === 'point') {
            const [x, y, width, height] = bbox;
            if (height > width) {
                if (y < videoElement.height / 2) {
                    gesture = "fish";  // Thumbs up
                } else {
                    gesture = "spinach";  // Thumbs down
                }
            }
        } else if (prediction.label === 'cross') {
            gesture = "broccoli";  // Hand cross
        } else if (prediction.label === 'ok') {
            gesture = "chicken";  // OK gesture
        }
    });

    if (gesture) {
        displayGestureResult(gesture);
        speakAndFetch(gesture);
    }
}

function displayGestureResult(gesture) {
    const gestureDisplayArea = document.getElementById('gesture-display');
    if (!gestureDisplayArea) {
        const newGestureDisplayArea = document.createElement('div');
        newGestureDisplayArea.id = 'gesture-display';
        newGestureDisplayArea.style.position = 'absolute';
        newGestureDisplayArea.style.right = '10px';
        newGestureDisplayArea.style.top = '10px';
        newGestureDisplayArea.style.backgroundColor = 'white';
        newGestureDisplayArea.style.border = '1px solid black';
        newGestureDisplayArea.style.padding = '10px';
        newGestureDisplayArea.style.zIndex = '1000';
        document.body.appendChild(newGestureDisplayArea);
    }
    document.getElementById('gesture-display').innerText = `Detected: ${gesture}`;
}

function speakAndFetch(ingredient) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(ingredient);
    synth.speak(utterance);
    fetchRecipes(ingredient);
}
//say only once 
let hasSpoken = false;  // Flag to track if the speech synthesis has occurred

function speakAndFetch(ingredient) {
    if (!hasSpoken) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(ingredient);
        utterance.onend = () => {
            hasSpoken = true;  // Set the flag to true after speaking
        };
        synth.speak(utterance);
    }
    fetchRecipes(ingredient);
}


function saveVideo() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'gesture_video.webm';
    a.click();
    window.URL.revokeObjectURL(url);
    recordedChunks = [];
}

// Download functionality
document.getElementById('download-button').addEventListener('click', function() {
    const resultsArea = document.getElementById('recipe-details');
    html2canvas(resultsArea).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jspdf.jsPDF();
        const imgWidth = 180;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;

        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        doc.save('recipe.pdf');
    });
});

// Update live time and date
function updateDateTime() {
    const now = new Date();
    const datetimeDisplay = document.getElementById('datetime-display');
    //datetimeDisplay.innerText = now.toLocaleString();
    datetimeDisplay.innerHTML = `<strong>${now.toLocaleString()}</strong>`;
}
// Update live time and date
/*function updateDateTime() {
    const now = new Date();
    const datetimeDisplay = document.getElementById('datetime-display');
    datetimeDisplay.innerHTML = `<strong>${now.toLocaleString()}</strong>`;
}*/
setInterval(updateDateTime, 1000); // Update every second
updateDateTime(); // Initial call to set the time immediately
document.getElementById('logout-button').addEventListener('click', function() {
    // Clear session data (if any)
    sessionStorage.clear();
    localStorage.removeItem('searchHistory');  // Clear history from local storage
    window.location.href = 'login.html';  // Redirect to login page
});

