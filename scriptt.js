/*!
 * HeavyHaul Voice Assistant Widget v1.0.0
 * (c) 2025 HeavyHaul
 * Released under the MIT License
 */
function shouldInitializeWidget() {
    const currentUrl = window.location.href;
    const orderDetailsPattern = /order-details/;
    const hasAIModel = window.location.search.includes('model=AI');
    
    // Debug output to see what's being matched
    console.log('URL check results:', {
        hasOrderDetails: orderDetailsPattern.test(currentUrl),
        hasAIModel: hasAIModel,
        currentUrl: currentUrl,
        search: window.location.search
    });
    
    // Both conditions must be true
    return orderDetailsPattern.test(currentUrl) && hasAIModel;
}

// exit if url is different
if (!shouldInitializeWidget()) {
    console.log("URL doesn't match required pattern. Widget not initialized.");
} else 
{
    (function() {
        // Create and inject CSS
        const style = document.createElement('style');
        style.innerHTML = `
        .heavyhaul-assistant-widget {
            --bg-dark: #1c2230;
            --bg-card: #2a3042;
            --text-light: #f0f2f5;
            --text-secondary: #a0aec0;
            --primary: #5e81f4;
            --primary-hover: #4a68d9;
            --accent: #5466ff;
            --accent-light: #5466ff20;
            --green: #27ae60;
            --red: #e74c3c;
            --red-hover: #c0392b;
            --yellow: #f39c12;
            --border-color: #3d4355;
            --input-bg: #202636;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: var(--text-light);
            z-index: 99999;
        }
        
        /* Floating button */
        .heavyhaul-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: var(--primary);
            box-shadow: 0 4px 16px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            z-index: 99999;
            line-height: 19px;
        }
        
        .heavyhaul-btn:hover {
            transform: scale(1.1);
            background-color: var(--primary-hover);
        }
        
        .heavyhaul-btn-icon {
            font-size: 24px;
            color: white;
            width: 24px;
            height: 24px;
        }
        
        /* Popup container */
        .heavyhaul-popup {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 450px;
            max-height: 800px;
            background-color: var(--bg-dark);
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.3);
            overflow: hidden;
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            transform-origin: bottom right;
            transition: all 0.3s ease-in-out;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            z-index: 99999;
        }
        
        .heavyhaul-popup.active {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
        }
        
        .heavyhaul-popup-header {
            background-color: var(--primary);
            padding: 15px;
            display: flex;
            justify-content: center; /* Change from space-between to center */
            align-items: center;
            position: relative; /* Add position relative */
        }

        .heavyhaul-popup-title {
            color: white;
            font-weight: 600;
            font-size: 16px;
            margin: 0;
            /* No additional styling needed as the parent is already centering it */
        }

        .heavyhaul-popup-close {
            color: white;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            position: absolute; /* Position the close button absolutely */
            right: 15px; /* Position from the right edge */
            top: 50%; /* Center vertically */
            transform: translateY(-50%); /* Fine-tune vertical centering */
        }
        
        .heavyhaul-popup-body {
            padding: 15px;
            flex-grow: 1;
            overflow-y: auto;
            max-height: 500px;
            background-color: var(--bg-card);
        }
        
        .heavyhaul-input-group {
            margin-bottom: 12px;
        }
        
        .heavyhaul-label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            color: var(--text-secondary);
            font-size: 14px;
        }
        
        .heavyhaul-input {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            box-sizing: border-box;
            background-color: var(--input-bg);
            color: var(--text-light);
            font-size: 15px;
            transition: border-color 0.3s;
        }
        
        .heavyhaul-input:focus {
            border-color: var(--primary);
            outline: none;
            box-shadow: 0 0 0 2px rgba(94, 129, 244, 0.2);
        }
        
        .heavyhaul-button-container {
            display: flex;
            justify-content: center;
            margin: 15px 0;
        }
        
        .heavyhaul-button {
            padding: 10px 20px;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s;
            box-shadow: 0 2px 8px rgba(94, 129, 244, 0.3);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .heavyhaul-button:hover {
            background-color: var(--primary-hover);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(94, 129, 244, 0.4);
        }
        
        .heavyhaul-button:disabled {
            background-color: var(--border-color);
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }
        
        .heavyhaul-button.listening {
            background-color: var(--red);
            animation: heavyhaul-pulse-red 1.5s infinite;
        }
        
        .heavyhaul-button.listening:hover {
            background-color: var(--red-hover);
        }
        
        .heavyhaul-status {
            margin: 12px 0;
            padding: 10px;
            border-left: 4px solid var(--primary);
            background-color: rgba(94, 129, 244, 0.1);
            border-radius: 0 6px 6px 0;
            font-size: 14px;
        }
        
        .heavyhaul-conversation {
            margin-top: 15px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            max-height: 300px;
            overflow-y: auto;
            padding: 12px;
            background-color: var(--bg-card);
            scrollbar-width: thin;
            scrollbar-color: var(--border-color) var(--bg-card);
            display: flex;
            flex-direction: column;
        }
        
        .heavyhaul-conversation::-webkit-scrollbar {
            width: 6px;
        }
        
        .heavyhaul-conversation::-webkit-scrollbar-track {
            background: var(--bg-card);
        }
        
        .heavyhaul-conversation::-webkit-scrollbar-thumb {
            background: var(--border-color);
            border-radius: 3px;
        }
        
        .heavyhaul-message {
            margin-bottom: 12px;
            padding: 10px 12px;
            border-radius: 8px;
            position: relative;
            border-left: 3px solid transparent;
            max-width: 85%;
            font-size: 14px;
        }
        
        .heavyhaul-user-message {
            background-color: rgba(94, 129, 244, 0.1);
            border-left-color: var(--primary);
            align-self: flex-end;
        }
        
        .heavyhaul-assistant-message {
            background-color: rgba(39, 174, 96, 0.1);
            border-left-color: var(--green);
            align-self: flex-start;
        }
        
        .heavyhaul-message-label {
            font-weight: 600;
            margin-bottom: 4px;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .heavyhaul-user-label {
            color: var(--primary);
        }
        
        .heavyhaul-assistant-label {
            color: var(--green);
        }
        
        .heavyhaul-pulse {
            animation: heavyhaul-pulse 1.5s infinite;
        }
        
        .heavyhaul-mic-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 6px;
            width: 16px;
            height: 16px;
        }
        
        .heavyhaul-mic-icon svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }
        
        .heavyhaul-wave-animation {
            display: inline-flex;
            align-items: flex-end;
            height: 14px;
            margin-left: 6px;
        }
        
        .heavyhaul-wave-animation span {
            display: inline-block;
            width: 3px;
            margin-right: 2px;
            background-color: var(--primary);
            border-radius: 1px;
            animation: heavyhaul-wave 1s infinite;
        }
        
        .heavyhaul-wave-animation span:nth-child(2) {
            animation-delay: 0.1s;
            height: 6px;
        }
        
        .heavyhaul-wave-animation span:nth-child(3) {
            animation-delay: 0.2s;
            height: 10px;
        }
        
        .heavyhaul-wave-animation span:nth-child(4) {
            animation-delay: 0.3s;
            height: 8px;
        }
        
        .heavyhaul-wave-animation span:nth-child(5) {
            animation-delay: 0.4s;
            height: 12px;
        }
        
        @keyframes heavyhaul-pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
        }
        
        @keyframes heavyhaul-pulse-red {
            0% { background-color: var(--red); }
            50% { background-color: rgba(231, 76, 60, 0.8); }
            100% { background-color: var(--red); }
        }
        
        @keyframes heavyhaul-wave {
            0%, 100% {
                transform: scaleY(1);
            }
            50% {
                transform: scaleY(1.6);
            }
        }
        `;
        document.head.appendChild(style);
        
        // SVG icon strings for reuse
        const MIC_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/></svg>';
        
        // Function to extract order ID from URL
        function getQueryParam(param) {
            let urlParams = new URLSearchParams(window.location.search);
                    return urlParams.get(param);
                }
        
        // Get order ID from URL
        const CURRENT_ORDER_ID = getQueryParam("orderId");
        console.log("Order ID prince:", CURRENT_ORDER_ID);
    
        // Create widget DOM
        function createWidgetDOM() {
            // Floating button
            const floatingBtn = document.createElement('div');
            floatingBtn.className = 'heavyhaul-btn heavyhaul-assistant-widget';
            floatingBtn.innerHTML = `<div class="heavyhaul-btn-icon">${MIC_ICON}</div>`;
            document.body.appendChild(floatingBtn);
            
            // Popup container
            const popup = document.createElement('div');
            popup.className = 'heavyhaul-popup heavyhaul-assistant-widget';
            
            popup.innerHTML = `
                <div class="heavyhaul-popup-header">
                    <h3 class="heavyhaul-popup-title">HeavyHaulGBT</h3>
                    <button class="heavyhaul-popup-close">&times;</button>
                </div>
                <div class="heavyhaul-popup-body">
                    <form id="heavyhaul-assistant-form" onsubmit="return false;">
                        <div class="heavyhaul-input-group" style="display: none;">
                            <label for="heavyhaul-order-id" class="heavyhaul-label">Order ID:</label>
                            <input type="text" id="heavyhaul-order-id" class="heavyhaul-input" value="${CURRENT_ORDER_ID || ''}" readonly>
                        </div>
                        
                        <div class="heavyhaul-input-group" style="display: none;">
                            <label for="heavyhaul-session-id" class="heavyhaul-label">Session ID:</label>
                            <input type="text" id="heavyhaul-session-id" class="heavyhaul-input" placeholder="Auto-generated" readonly>
                        </div>
                        
                        <div class="heavyhaul-button-container">
                            <button id="heavyhaul-speak-btn" type="button" class="heavyhaul-button">
                                <span class="heavyhaul-mic-icon">${MIC_ICON}</span>
                                Start Listening
                                <div class="heavyhaul-wave-animation" style="display: none;">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </button>
                        </div>
                    </form>
                    
                    <div id="heavyhaul-status" class="heavyhaul-status">
                        ${CURRENT_ORDER_ID 
                            ? `What would you like to ask about order ${CURRENT_ORDER_ID}?` 
                            : 'No order ID found in the URL. The assistant may not work properly.'}
                    </div>
                    
                    <div class="heavyhaul-conversation" id="heavyhaul-conversation">
                        <div class="heavyhaul-message heavyhaul-assistant-message">
                            <div class="heavyhaul-message-label heavyhaul-assistant-label">Assistant:</div>
                            <div>Hello! I'm your HeavyHaul assistant. How can I help you with your order?</div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(popup);
            
            return {
                floatingBtn,
                popup,
                closeBtn: popup.querySelector('.heavyhaul-popup-close'),
                speakBtn: document.getElementById('heavyhaul-speak-btn'),
                statusDiv: document.getElementById('heavyhaul-status'),
                sessionIdInput: document.getElementById('heavyhaul-session-id'),
                orderIdInput: document.getElementById('heavyhaul-order-id'),
                conversationDiv: document.getElementById('heavyhaul-conversation'),
                assistantForm: document.getElementById('heavyhaul-assistant-form'),
                waveAnimation: popup.querySelector('.heavyhaul-wave-animation')
            };
        }
        
        // Initialize the widget functionality
        function initWidget() {
            const elements = createWidgetDOM();
            
            // Toggle popup visibility with animation
            elements.floatingBtn.addEventListener('click', function() {
                togglePopup(elements.popup);
            });
            
            // Close popup
            elements.closeBtn.addEventListener('click', function() {
                togglePopup(elements.popup, false);
            });
            
            // Disable button if no order ID found
            if (!CURRENT_ORDER_ID) {
                elements.speakBtn.disabled = true;
                elements.speakBtn.title = "No order ID found in the URL";
            }
            
            // Initialize voice assistant functionality
            initVoiceAssistant(elements);
        }
        
        // Toggle popup with animation
        function togglePopup(popup, show) {
            const isCurrentlyVisible = popup.classList.contains('active');
            const shouldShow = show !== undefined ? show : !isCurrentlyVisible;
            
            if (shouldShow) {
                popup.classList.add('active');
            } else {
                popup.classList.remove('active');
            }
        }
        
        // Voice assistant functionality
        function initVoiceAssistant(elements) {
            const {
                speakBtn,
                statusDiv,
                sessionIdInput,
                orderIdInput,
                conversationDiv,
                assistantForm,
                waveAnimation
            } = elements;
                
            // Using relative paths
            const API_URL = 'https://heavy-haul-gbt.vercel.app';
            
            // Speech recognition setup
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            let recognition = null;
            let isListening = false;
            let processingCommand = false;
            
            // Current session ID
            let currentSessionId = null;
            
            // Audio source reference
            let currentAudioSource = null;
            let audioContext = null;
            
            // Add message to conversation
            function addMessage(text, isUser) {
                const messageDiv = document.createElement('div');
                messageDiv.className = isUser ? 'heavyhaul-message heavyhaul-user-message' : 'heavyhaul-message heavyhaul-assistant-message';
                
                const labelDiv = document.createElement('div');
                labelDiv.className = isUser ? 'heavyhaul-message-label heavyhaul-user-label' : 'heavyhaul-message-label heavyhaul-assistant-label';
                labelDiv.textContent = isUser ? 'You:' : 'Assistant:';
                
                const contentDiv = document.createElement('div');
                contentDiv.textContent = text;
                
                messageDiv.appendChild(labelDiv);
                messageDiv.appendChild(contentDiv);
                
                conversationDiv.appendChild(messageDiv);
                conversationDiv.scrollTop = conversationDiv.scrollHeight;
            }
            
            // Initialize speech recognition
            function initSpeechRecognition() {
                if (!SpeechRecognition) {
                    statusDiv.textContent = 'Speech recognition not supported in this browser';
                    speakBtn.disabled = true;
                    return false;
                }
                
                recognition = new SpeechRecognition();
                recognition.lang = 'en-US';
                recognition.continuous = false;  // We'll handle continuous listening manually
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;
                
                // Set higher energy threshold
                if (recognition.audioThreshold !== undefined) {
                    recognition.audioThreshold = 800;
                }
                
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript.trim();
                    console.log('Recognized speech:', transcript);
                    
                    const transcriptLower = transcript.toLowerCase();
                    
                    // Check if user said STOP during audio playback
                    if (transcriptLower === "stop" && currentAudioSource !== null) {
                        console.log('STOP command detected, stopping audio playback');
                        stopAudioPlayback();
                        statusDiv.textContent = 'Audio stopped. Ready for your next question.';
                        processingCommand = false;
                        restartRecognition();
                        return;
                    }
                    
                    if (!processingCommand) {
                        processingCommand = true;
                        statusDiv.textContent = 'Processing...';
                        
                        addMessage(transcript, true);
                        processCommand(transcript);
                    }
                };
                
                recognition.onerror = function(event) {
                    console.error('Speech recognition error:', event.error);
                    if (event.error === 'no-speech') {
                        // Just restart recognition on no-speech
                        if (isListening && !processingCommand) {
                            restartRecognition();
                        }
                    } else {
                        statusDiv.textContent = `Error: ${event.error}. Restarting...`;
                        if (isListening && !processingCommand) {
                            setTimeout(restartRecognition, 1000);
                        }
                    }
                };
                
                recognition.onend = function() {
                    console.log('Recognition ended. isListening:', isListening, 'processingCommand:', processingCommand);
                    // Only restart if we're still supposed to be listening and not processing a command
                    if (isListening && !processingCommand) {
                        restartRecognition();
                    }
                };
                
                return true;
            }
            
            // Function to restart recognition with a slight delay to prevent resource issues
            function restartRecognition() {
                if (!isListening) return;
                
                setTimeout(() => {
                    try {
                        recognition.start();
                        console.log('Restarted recognition');
                    } catch (err) {
                        console.error('Error restarting recognition:', err);
                        // If we hit an error, try again after a longer delay
                        setTimeout(restartRecognition, 2000);
                    }
                }, 300);
            }
            
            // Stop current audio playback if any
            function stopAudioPlayback() {
                if (currentAudioSource) {
                    try {
                        currentAudioSource.stop();
                        currentAudioSource.disconnect();
                        currentAudioSource = null;
                        
                        // Resume recognition after stopping audio
                        processingCommand = false;
                        if (isListening) {
                            restartRecognition();
                        }
                    } catch (err) {
                        console.error('Error stopping audio:', err);
                    }
                }
            }
            
            // Process the recognized command
            function processCommand(command) {
                // Check if we have an order ID from the URL
                const orderId = CURRENT_ORDER_ID;
                if (!orderId) {
                    statusDiv.textContent = 'No order ID available. Cannot process your query.';
                    processingCommand = false;
                    restartRecognition();
                    return;
                }
                
                statusDiv.textContent = 'Processing your question...';
                statusDiv.classList.add('heavyhaul-pulse');
                
                // Get session ID
                const sessionId = sessionIdInput.value.trim() || currentSessionId;
                
                // Prepare the request data
                const requestData = {
                    message: command,
                    order_id: orderId
                };
                
                if (sessionId) {
                    requestData.session_id = sessionId;
                }
                
                // Create audio context if not already created
                if (!audioContext) {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }
                
                console.log('Sending request to chat API:', requestData);
                
                // Send request to backend using fetch API
                fetch(`${API_URL}/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                })
                .then(response => {
                    console.log('Received response from chat API:', response.status);
                    if (!response.ok) {
                        throw new Error(`Server error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Response data:', data);
                    
                    // Save session ID
                    currentSessionId = data.session_id;
                    sessionIdInput.value = currentSessionId;
                    
                    // Add assistant's response to conversation
                    addMessage(data.response, false);
                    
                    console.log('Fetching audio from:', `${API_URL}${data.audio_endpoint}`);
                    
                    // Get the audio version of the response
                    return fetch(`${API_URL}${data.audio_endpoint}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ text: data.response })
                    });
                })
                .then(response => {
                    console.log('Received audio response:', response.status);
                    if (!response.ok) {
                        throw new Error('Error fetching audio');
                    }
                    return response.arrayBuffer();  // Use arrayBuffer instead of blob for AudioContext
                })
                .then(arrayBuffer => {
                    console.log('Decoding audio data...');
                    statusDiv.textContent = 'Playing response... (Say "STOP" to interrupt)';
                    statusDiv.classList.remove('heavyhaul-pulse');
                    
                    // Decode the audio data
                    return new Promise((resolve, reject) => {
                        audioContext.decodeAudioData(
                            arrayBuffer, 
                            buffer => resolve(buffer),
                            error => reject(new Error('Audio decoding error: ' + error))
                        );
                    });
                })
                .then(audioBuffer => {
                    console.log('Audio decoded, playing...');
                    
                    // Create a source node
                    const source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);
                    
                    // Store reference to current audio source
                    currentAudioSource = source;
                    
                    // Set up STOP detection during playback
                    if (isListening) {
                        // We'll listen for "STOP" commands during playback
                        // Recognition continues running while audio plays
                        try {
                            recognition.start();
                        } catch (err) {
                            console.error('Error starting recognition during playback:', err);
                        }
                    }
                    
                    // When playback ends
                    source.onended = () => {
                        console.log('Audio playback complete, ready for next command');
                        statusDiv.textContent = 'Ready for your next question.';
                        currentAudioSource = null;
                        processingCommand = false;
                        
                        // Restart recognition after audio playback
                        if (isListening) {
                            restartRecognition();
                        }
                    };
                    
                    // Start playback
                    source.start(0);
                })
                .catch(error => {
                    console.error('Error in processing or audio playback:', error);
                    statusDiv.textContent = `Error: ${error.message}. Ready for next command.`;
                    statusDiv.classList.remove('heavyhaul-pulse');
                    processingCommand = false;
                    
                    // Restart recognition after error
                    if (isListening) {
                        restartRecognition();
                    }
                });
            }
            
            // Explicitly prevent form submission
            assistantForm.addEventListener('submit', function(event) {
                event.preventDefault();
                return false;
            });
            
            // Initialize everything
            if (initSpeechRecognition()) {
                speakBtn.addEventListener('click', function(event) {
                    event.preventDefault();
                    
                    // Check for order ID before proceeding
                    if (!CURRENT_ORDER_ID) {
                        statusDiv.textContent = 'No order ID found in the URL. Cannot activate voice assistant.';
                        return;
                    }
                    
                    // Toggle listening state
                    isListening = !isListening;
                    
                    if (isListening) {
                        // Start continuous listening
                        const micIcon = document.createElement('span');
                        micIcon.className = 'heavyhaul-mic-icon';
                        micIcon.innerHTML = MIC_ICON;
                        
                        speakBtn.innerHTML = '';
                        speakBtn.appendChild(micIcon);
                        speakBtn.appendChild(document.createTextNode('Stop Listening'));
                        
                        speakBtn.classList.add('listening');
                        waveAnimation.style.display = 'inline-flex';
                        speakBtn.appendChild(waveAnimation);
                        
                        statusDiv.textContent = 'Listening... What would you like to ask?';
                        processingCommand = false;
                        
                        try {
                            recognition.start();
                        } catch (err) {
                            console.error('Recognition start error:', err);
                            statusDiv.textContent = 'Error starting recognition. Please try again.';
                            isListening = false;
                            
                            const micIcon = document.createElement('span');
                            micIcon.className = 'heavyhaul-mic-icon';
                            micIcon.innerHTML = MIC_ICON;
                            
                            speakBtn.innerHTML = '';
                            speakBtn.appendChild(micIcon);
                            speakBtn.appendChild(document.createTextNode('Start Listening'));
                            
                            speakBtn.classList.remove('listening');
                            waveAnimation.style.display = 'none';
                        }
                    } else {
                        // Stop listening
                        const micIcon = document.createElement('span');
                        micIcon.className = 'heavyhaul-mic-icon';
                        micIcon.innerHTML = MIC_ICON;
                        
                        speakBtn.innerHTML = '';
                        speakBtn.appendChild(micIcon);
                        speakBtn.appendChild(document.createTextNode('Start Listening'));
                        
                        speakBtn.classList.remove('listening');
                        waveAnimation.style.display = 'none';
                        
                        statusDiv.textContent = 'Listening stopped. Click "Start Listening" to activate the voice assistant.';
                        
                        // Also stop any currently playing audio
                        stopAudioPlayback();
                        
                        try {
                            recognition.stop();
                        } catch (err) {
                            console.error('Recognition stop error:', err);
                        }
                    }
                });
            }
        }
        
        // Initialize the widget when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initWidget);
        } else {
            initWidget();
        }
    })();
}
