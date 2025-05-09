(function() {
        // Create and inject CSS (Enhanced Theme that matches the website)
        const style = document.createElement('style');
        style.innerHTML = `
        .heavyhaul-assistant-widget {
            /* Enhanced Color Theme to match website */
            --bg-dark: #1c2230;
            --bg-card: #2a3042;
            --text-light: #f0f2f5;
            --text-secondary: #a0aec0;
            --primary: #5466ff;
            --primary-hover: #4355ee;
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
    
    
    /* Enhanced Floating button with pulse animation */
    .heavyhaul-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: var(--primary);
    box-shadow: 0 4px 16px rgba(84, 102, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 99999;
    line-height: 19px;
    animation: heavyhaul-float 3s ease-in-out infinite;
    }
    
    .heavyhaul-btn:hover {
            transform: scale(1.1) translateY(-5px);
            background-color: var(--primary-hover);
            box-shadow: 0 8px 24px rgba(84, 102, 255, 0.5);
        }
    
        .heavyhaul-btn-icon {
            font-size: 24px;
            color: white;
            width: 24px;
            height: 24px;
            transition: transform 0.3s ease;
        }
    
        .heavyhaul-btn:hover .heavyhaul-btn-icon {
            transform: scale(1.1);
        }
    
        /* Enhanced Popup container with better transitions - EXTENDED WIDTH */
        .heavyhaul-popup {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 450px;
            max-height: 80vh;
            height: 600px;
            background-color: var(--bg-dark);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            overflow: hidden;
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            transform-origin: bottom right;
            transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
            pointer-events: none;
            display: flex;
            flex-direction: column;
            z-index: 99999;
            border: 1px solid rgba(84, 102, 255, 0.2);
        }
    
        .heavyhaul-popup.active {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
            animation: heavyhaul-popup-intro 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
    
        .heavyhaul-popup-header {
            background: linear-gradient(135deg, var(--primary) 0%, #4355ee 100%);
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
    
        .heavyhaul-popup-title {
            color: white;
            font-weight: 600;
            font-size: 18px;
            margin: 0;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
            letter-spacing: 0.5px;
        }
    
        /* Buttons in header */
        .heavyhaul-popup-header-buttons {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 10px;
        }
    
        .heavyhaul-popup-close,
        .heavyhaul-popup-menu {
            color: white;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
    
        .heavyhaul-popup-close:hover,
        .heavyhaul-popup-menu:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
    
        /* Chat mode menu */
        .heavyhaul-chat-mode-menu {
            position: absolute;
            right: 45px;
            top: 40px;
            background-color: var(--bg-card);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            overflow: hidden;
            width: 200px;
            z-index: 1000;
            display: none;
            border: 1px solid var(--border-color);
        }
    
        .heavyhaul-chat-mode-menu.active {
            display: block;
            animation: heavyhaul-menu-fade-in 0.2s ease-out;
        }
    
        .heavyhaul-chat-mode-option {
            padding: 12px 15px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    
        .heavyhaul-chat-mode-option:hover {
            background-color: rgba(84, 102, 255, 0.1);
        }
    
        .heavyhaul-chat-mode-option.active {
            background-color: rgba(84, 102, 255, 0.2);
            font-weight: 600;
        }
    
        .heavyhaul-chat-mode-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--primary);
            display: none;
        }
    
        .heavyhaul-chat-mode-option.active .heavyhaul-chat-mode-indicator {
            display: block;
        }
    
        .heavyhaul-popup-body {
            padding: 15px;
            flex-grow: 1;
            overflow: hidden;
            background-color: var(--bg-dark);
            display: flex;
            flex-direction: column;
            transition: all 0.3s;
            background-image: linear-gradient(to bottom, rgba(84, 102, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%);
        }
    
        .heavyhaul-input-group {
            margin-bottom: 12px;
            flex-shrink: 0;
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
            margin: -2px 0 9px; /* Changed from 15px 0 - moves it 10px up */
            flex-shrink: 0;
        }
    
        .heavyhaul-button {
            padding: 12px 24px;
            background: linear-gradient(135deg, var(--primary) 0%, #4355ee 100%);
            color: white;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 500;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(84, 102, 255, 0.3);
            display: flex;
            align-items: center;
            gap: 0px;
            position: relative;
            overflow: hidden;
            transform: translateZ(0);
        }
    
        .heavyhaul-button:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: all 0.6s;
        }
    
        .heavyhaul-button:hover {
            background: linear-gradient(135deg, #4355ee 0%, var(--primary) 100%);
            transform: translateY(-3px);
            box-shadow: 0 6px 14px rgba(84, 102, 255, 0.4);
        }
    
        .heavyhaul-button:hover:before {
            left: 100%;
        }
    
        .heavyhaul-button:disabled {
            background: linear-gradient(135deg, #7a7a7a 0%, #5a5a5a 100%);
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }
    
        .heavyhaul-button.listening {
            background: linear-gradient(135deg, var(--red) 0%, var(--red-hover) 100%);
            animation: heavyhaul-pulse-red 1.5s infinite;
        }
    
        .heavyhaul-button.listening:hover {
            background: linear-gradient(135deg, var(--red-hover) 0%, var(--red) 100%);
        }
    
        .heavyhaul-status {
            margin: 0 0 12px 0;
            padding: 12px;
            border-left: 4px solid var(--primary);
            background-color: rgba(84, 102, 255, 0.1);
            border-radius: 4px;
            font-size: 14px;
            color: var(--text-light);
            flex-shrink: 0;
            transition: all 0.3s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            font-weight: 500;
        }
    
        .heavyhaul-conversation {
            border: 1px solid var(--border-color);
            border-radius: 10px;
            flex-grow: 1;
            min-height: 100px;
            overflow-y: auto;
            padding: 16px;
            background-color: var(--bg-card);
            scrollbar-width: thin;
            scrollbar-color: var(--border-color) var(--bg-card);
            display: flex;
            flex-direction: column;
            transition: all 0.3s;
            position: relative;
            box-shadow: inset 0 2px 8px rgba(0,0,0,0.1);
        }
    
        .heavyhaul-conversation::-webkit-scrollbar {
            width: 6px;
        }
    
        .heavyhaul-conversation::-webkit-scrollbar-track {
            background: var(--bg-card);
            border-radius: 3px;
        }
    
        .heavyhaul-conversation::-webkit-scrollbar-thumb {
            background: var(--border-color);
            border-radius: 3px;
        }
    
        .heavyhaul-conversation::-webkit-scrollbar-thumb:hover {
            background: var(--primary);
        }
    
        .heavyhaul-message {
            margin-bottom: 16px;
            padding: 12px 14px;
            border-radius: 12px;
            position: relative;
            max-width: 85%;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            word-wrap: break-word;
            transition: all 0.3s;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            animation: heavyhaul-message-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    
        .heavyhaul-user-message {
            background: linear-gradient(135deg, var(--primary) 0%, #4355ee 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
        }
    
        .heavyhaul-assistant-message {
            background-color: var(--input-bg);
            color: var(--text-light);
            align-self: flex-start;
            border-bottom-left-radius: 2px;
            border-left: 3px solid var(--primary);
        }
    
        .heavyhaul-message-label {
            font-weight: 600;
            margin-bottom: 6px;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--text-secondary);
        }
    
        .heavyhaul-user-message .heavyhaul-message-label {
            color: rgba(255, 255, 255, 0.9);
        }
    
        .heavyhaul-message-content {
            margin-bottom: 8px;
            line-height: 1.4;
        }
    
        /* Enhanced Feedback Button Styling */
        .heavyhaul-feedback-buttons {
            display: flex;
            gap: 8px;
            margin-top: 8px;
            align-self: flex-start;
        }
    
        .heavyhaul-feedback-btn {
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            border-radius: 6px;
            padding: 5px 8px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s ease;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    
        .heavyhaul-feedback-btn:hover:not(:disabled) {
            background-color: rgba(84, 102, 255, 0.1);
            color: var(--text-light);
            transform: translateY(-2px);
        }
    
        .heavyhaul-feedback-btn:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    
        .heavyhaul-feedback-btn.selected {
             background-color: var(--primary);
             color: white;
             border-color: var(--primary);
             box-shadow: 0 2px 5px rgba(84, 102, 255, 0.3);
        }
    
        /* Enhanced animations */
        .heavyhaul-pulse {
            animation: heavyhaul-pulse 1.5s infinite;
        }
    
        .heavyhaul-mic-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 6px;
            width: 19px;
            height: 19px;
            position: relative;
        }
    
        .heavyhaul-mic-icon svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
            transition: transform 0.2s ease;
        }
    
        .heavyhaul-button.listening .heavyhaul-mic-icon svg {
            animation: heavyhaul-mic-pulse 1s infinite;
        }
    
        /* Enhanced wave animation */
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
            background-color: white;
            border-radius: 1px;
            animation: heavyhaul-wave 1s infinite;
            height: 4px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
    
        .heavyhaul-button:not(.listening) .heavyhaul-wave-animation span {
             background-color: var(--primary);
        }
    
        .heavyhaul-wave-animation span:nth-child(1) { animation-delay: 0.0s; height: 4px;}
        .heavyhaul-wave-animation span:nth-child(2) { animation-delay: 0.1s; height: 6px; }
        .heavyhaul-wave-animation span:nth-child(3) { animation-delay: 0.2s; height: 10px; }
        .heavyhaul-wave-animation span:nth-child(4) { animation-delay: 0.3s; height: 8px; }
        .heavyhaul-wave-animation span:nth-child(5) { animation-delay: 0.4s; height: 12px; }
    
        /* Enhanced keyframe animations */
        @keyframes heavyhaul-pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
        }
    
        @keyframes heavyhaul-pulse-red {
            0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
            100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
        }
    
        @keyframes heavyhaul-wave {
            0% { transform: scaleY(0.4); }
            50% { transform: scaleY(1); }
            100% { transform: scaleY(0.4); }
        }
    
        @keyframes heavyhaul-float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
        }
    
        @keyframes heavyhaul-popup-intro {
            0% { transform: translateY(20px) scale(0.95); opacity: 0; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
        }
    
        @keyframes heavyhaul-message-pop {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    
        @keyframes heavyhaul-mic-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    
        @keyframes heavyhaul-menu-fade-in {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        `;
    document.head.appendChild(style);

    // SVG icon strings for reuse
    const MIC_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/></svg>';
    const MENU_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>';

    // Function to extract query param
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get order ID from URL
    const CURRENT_ORDER_ID = getQueryParam("orderId");
    console.log("HeavyHaul Assistant - Order ID:", CURRENT_ORDER_ID);

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
                <div class="heavyhaul-popup-header-buttons">
                    <button class="heavyhaul-popup-menu" title="Chat Mode">${MENU_ICON}</button>
                    <button class="heavyhaul-popup-close" title="Close">×</button>
                </div>
                <div class="heavyhaul-chat-mode-menu">
                    <div class="heavyhaul-chat-mode-option active" data-mode="order">
                        Current Order
                        <span class="heavyhaul-chat-mode-indicator"></span>
                    </div>
                    <div class="heavyhaul-chat-mode-option" data-mode="state">
                        State Regulations
                        <span class="heavyhaul-chat-mode-indicator"></span>
                    </div>
                </div>
            </div>
            <div class="heavyhaul-popup-body">
                <form id="heavyhaul-assistant-form" onsubmit="return false;">
                    <input type="hidden" id="heavyhaul-order-id" value="${CURRENT_ORDER_ID || ''}">
                    <input type="hidden" id="heavyhaul-session-id">
                    <input type="hidden" id="heavyhaul-browser-id">
                    <input type="hidden" id="heavyhaul-chat-mode" value="order">

                    <div class="heavyhaul-button-container">
                        <button id="heavyhaul-speak-btn" type="button" class="heavyhaul-button">
                            <span class="heavyhaul-mic-icon">${MIC_ICON}</span>
                            Start Listening
                            <div class="heavyhaul-wave-animation" style="display: none;">
                                <span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </button>
                    </div>
                </form>

                <div id="heavyhaul-status" class="heavyhaul-status">
                    ${CURRENT_ORDER_ID
                        ? `Ready to assist with order ${CURRENT_ORDER_ID}.`
                        : 'Warning: No order ID found in URL.'}
                </div>

                <div class="heavyhaul-conversation" id="heavyhaul-conversation">
                    <!-- Conversation messages will be added here -->
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        return {
            floatingBtn, popup,
            closeBtn: popup.querySelector('.heavyhaul-popup-close'),
            menuBtn: popup.querySelector('.heavyhaul-popup-menu'),
            chatModeMenu: popup.querySelector('.heavyhaul-chat-mode-menu'),
            chatModeOptions: popup.querySelectorAll('.heavyhaul-chat-mode-option'),
            speakBtn: document.getElementById('heavyhaul-speak-btn'),
            statusDiv: document.getElementById('heavyhaul-status'),
            sessionIdInput: document.getElementById('heavyhaul-session-id'),
            orderIdInput: document.getElementById('heavyhaul-order-id'),
            browserIdInput: document.getElementById('heavyhaul-browser-id'),
            chatModeInput: document.getElementById('heavyhaul-chat-mode'),
            conversationDiv: document.getElementById('heavyhaul-conversation'),
            assistantForm: document.getElementById('heavyhaul-assistant-form'),
            waveAnimation: popup.querySelector('.heavyhaul-wave-animation')
        };
    }

    // Initialize the widget functionality
    function initWidget() {
        const elements = createWidgetDOM();

        // Toggle popup
        elements.floatingBtn.addEventListener('click', () => togglePopup(elements.popup, true));
        elements.closeBtn.addEventListener('click', () => togglePopup(elements.popup, false));
        
        // Close popup when clicking outside
        document.addEventListener('click', (event) => {
             if (!elements.popup.contains(event.target) && !elements.floatingBtn.contains(event.target) && elements.popup.classList.contains('active')) {
                 togglePopup(elements.popup, false);
             }
        });

        // Toggle menu
        elements.menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing the popup
            elements.chatModeMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!elements.menuBtn.contains(event.target) && elements.chatModeMenu.classList.contains('active')) {
                elements.chatModeMenu.classList.remove('active');
            }
        });

        // Handle chat mode selection
        elements.chatModeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const mode = option.dataset.mode;
                
                // Update active class
                elements.chatModeOptions.forEach(opt => {
                    opt.classList.toggle('active', opt === option);
                });
                
                // Update hidden input
                elements.chatModeInput.value = mode;
                
                // Update status message
                if (mode === 'order') {
                    elements.statusDiv.textContent = CURRENT_ORDER_ID
                        ? `Ready to assist with order ${CURRENT_ORDER_ID}.`
                        : 'Warning: No order ID found in URL.';
                    
                    // In order mode, mic should be disabled if no order ID
                    elements.speakBtn.disabled = !CURRENT_ORDER_ID;
                } else {
                    elements.statusDiv.textContent = 'Start asking about your route or any state regulations.';
                    
                    // In state mode, mic should always be enabled
                    elements.speakBtn.disabled = false;
                }
                
                // Clear conversation when switching modes
                elements.conversationDiv.innerHTML = '';
                
                // Add initial greeting based on mode
                if (mode === 'order') {
                    addMessage("Hello! I'm your HeavyHaulGBT assistant. How can I help you with your order?", false, null, elements);
                } else {
                    addMessage("Hello! I'm your HeavyHaulGBT assistant. How can i help you with State Regulations.", false, null, elements);
                }
                
                // Close the menu
                elements.chatModeMenu.classList.remove('active');
            });
        });

        if (!CURRENT_ORDER_ID) {
            elements.speakBtn.disabled = true;
            elements.speakBtn.title = "No order ID found in the URL";
            elements.statusDiv.style.borderColor = 'var(--red)';
        }

        // Generate browser fingerprint and set it as a hidden field
        const browserFingerprint = generateBrowserFingerprint();
        elements.browserIdInput.value = browserFingerprint;

        initVoiceAssistant(elements);
    }

    // Generate a browser fingerprint
    function generateBrowserFingerprint() {
        const fingerprint = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            colorDepth: window.screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            cookiesEnabled: navigator.cookieEnabled,
            // Adding more browser-specific properties
            pixelRatio: window.devicePixelRatio || 1,
            doNotTrack: navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack,
            plugins: Array.from(navigator.plugins || []).map(p => p.name).join(',')
        };
        
        // Create a hash of the fingerprint
        const fingerprintString = JSON.stringify(fingerprint);
        return hashString(fingerprintString);
    }

    // Simple hash function for browser fingerprint
    function hashString(str) {
        let hash = 0;
        if (str.length === 0) return hash;
        
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        
        return Math.abs(hash).toString(16);
    }

    // Toggle popup visibility
    function togglePopup(popup, show) {
        const isCurrentlyVisible = popup.classList.contains('active');
        const shouldShow = show !== undefined ? show : !isCurrentlyVisible;
        if (shouldShow && !isCurrentlyVisible) popup.classList.add('active');
        else if (!shouldShow && isCurrentlyVisible) popup.classList.remove('active');
    }

    // --- Add message to conversation UI (extracted as a standalone function) ---
    function addMessage(text, isUser, messageId = null, elements = null) {
        // If elements not provided, try to find them
        const conversationDiv = elements ? elements.conversationDiv : document.getElementById('heavyhaul-conversation');
        if (!conversationDiv) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'heavyhaul-message heavyhaul-user-message' : 'heavyhaul-message heavyhaul-assistant-message';

        if (!isUser && messageId) {
            messageDiv.dataset.messageId = messageId;
        }

        const labelDiv = document.createElement('div');
        labelDiv.className = 'heavyhaul-message-label';
        labelDiv.textContent = isUser ? 'You:' : 'Assistant:';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'heavyhaul-message-content';
        contentDiv.textContent = text;

        messageDiv.appendChild(labelDiv);
        messageDiv.appendChild(contentDiv);

        // Add Feedback Buttons for Assistant Messages (if messageId is present)
        if (!isUser && messageId) {
            const feedbackContainer = document.createElement('div');
            feedbackContainer.className = 'heavyhaul-feedback-buttons';
            feedbackContainer.dataset.messageId = messageId; // Add messageId here too for easier access

            const goodBtn = createFeedbackButton('good', '👍');
            const badBtn = createFeedbackButton('bad', '👎');
            const commentBtn = createFeedbackButton('comment', '💬');

            feedbackContainer.appendChild(goodBtn);
            feedbackContainer.appendChild(badBtn);
            feedbackContainer.appendChild(commentBtn);
            messageDiv.appendChild(feedbackContainer);
        }

        conversationDiv.appendChild(messageDiv);
        conversationDiv.scrollTo({ top: conversationDiv.scrollHeight, behavior: 'smooth' });
    }

    // --- Helper to create feedback buttons ---
    function createFeedbackButton(type, symbol) {
        const button = document.createElement('button');
        button.className = 'heavyhaul-feedback-btn';
        button.dataset.feedbackType = type; // 'good', 'bad', or 'comment'
        button.textContent = symbol;
        button.title = type.charAt(0).toUpperCase() + type.slice(1);
        button.addEventListener('click', handleFeedbackClick);
        return button;
    }

    // --- Handler for feedback button clicks ---
    async function handleFeedbackClick(event) {
        const button = event.currentTarget;
        const feedbackType = button.dataset.feedbackType; // 'good', 'bad', or 'comment'
        const feedbackContainer = button.closest('.heavyhaul-feedback-buttons');
        const messageId = feedbackContainer.dataset.messageId;
        const sessionIdInput = document.getElementById('heavyhaul-session-id');
        const sessionId = sessionIdInput ? (sessionIdInput.value.trim() || localStorage.getItem(`heavyhaul_session_${document.getElementById('heavyhaul-order-id').value}_${document.getElementById('heavyhaul-browser-id').value}`)) : null;

        // Initialize messageFeedbackState if it doesn't exist
        if (typeof window.messageFeedbackState === 'undefined') {
            window.messageFeedbackState = {};
        }
        
        // Initialize this message's feedback state if it doesn't exist
        if (!window.messageFeedbackState[messageId]) {
            window.messageFeedbackState[messageId] = { rating: null, comment: null, ratingSubmitted: false, commentSubmitted: false };
        }

        if (!messageId || !sessionId) {
            console.error("Feedback Error: Missing messageId or sessionId.");
            return;
        }

        // Prevent action if this specific feedback type has already been successfully submitted
        if ((feedbackType === 'good' || feedbackType === 'bad') && window.messageFeedbackState[messageId].ratingSubmitted) {
            console.log("Rating feedback already submitted for this message.");
            return;
        }
        // Check comment separately - user might rate then comment
        if (feedbackType === 'comment' && window.messageFeedbackState[messageId].commentSubmitted) {
            console.log("Comment feedback already submitted for this message.");
            return;
        }

        let userCommentText = null;
        let ratingValue = null;

        // --- Handle Comment Button ---
        if (feedbackType === 'comment') {
            userCommentText = prompt("Please provide your comment for this response:");
            if (userCommentText === null) return; // User cancelled
            userCommentText = userCommentText.trim();
            if (!userCommentText) {
                 alert("Comment cannot be empty.");
                 return;
            }
            // Update state
            window.messageFeedbackState[messageId].comment = userCommentText;
            button.classList.add('selected'); // Visually select comment button
            button.disabled = true; // Disable after successful comment prompt
            window.messageFeedbackState[messageId].commentSubmitted = true; // Mark as submitted locally immediately
        }
        // --- Handle Rating Buttons ---
        else if (feedbackType === 'good' || feedbackType === 'bad') {
            ratingValue = feedbackType;
            // Update state
            window.messageFeedbackState[messageId].rating = ratingValue;

            // Update visual selection for rating buttons
            const buttons = feedbackContainer.querySelectorAll('.heavyhaul-feedback-btn[data-feedback-type="good"], .heavyhaul-feedback-btn[data-feedback-type="bad"]');
            buttons.forEach(btn => {
                btn.classList.toggle('selected', btn === button);
                btn.disabled = true; // Disable both rating buttons after one is clicked
            });
            window.messageFeedbackState[messageId].ratingSubmitted = true; // Mark as submitted locally immediately
        }

        // --- Send combined feedback state to server ---
        // Only send if something was actually selected/entered in *this* interaction
        if (ratingValue !== null || userCommentText !== null) {
            await sendFeedbackToServer(sessionId, messageId);
        }
    }

    // --- Async function to send the CURRENT feedback state to the backend ---
    async function sendFeedbackToServer(sessionId, messageId) {
        if (!window.messageFeedbackState || !window.messageFeedbackState[messageId]) {
            console.error("Cannot send feedback, state missing for message:", messageId);
            return;
        }

        const statusDiv = document.getElementById('heavyhaul-status');
        const API_URL = 'https://www.heavyhaulgbt.com';

        // Get current state for this message
        const currentState = window.messageFeedbackState[messageId];
        const payload = {
            session_id: sessionId,
            message_id: messageId,
            rating: currentState.rating,
            comment: currentState.comment
        };

        if (statusDiv) {
            statusDiv.textContent = 'Submitting feedback...';
            statusDiv.classList.add('heavyhaul-pulse');
        }

        try {
            const response = await fetch(`${API_URL}/api/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (statusDiv) {
                statusDiv.classList.remove('heavyhaul-pulse');
            }
            
            if (!response.ok) {
                try {
                    const error = await response.json();
                    throw new Error(error.message || `HTTP error ${response.status}`);
                } catch (err) {
                    throw new Error(`HTTP error ${response.status}`);
                }
            }
            
            const data = await response.json();
            console.log('Feedback submission successful:', data);
            if (statusDiv) {
                statusDiv.textContent = 'Feedback received. Ready.';
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            if (statusDiv) {
                statusDiv.textContent = `Feedback error: ${error.message}.`;
                statusDiv.classList.remove('heavyhaul-pulse');
            }
        }
    }

    // Voice assistant functionality
    function initVoiceAssistant(elements) {
        const {
            speakBtn, statusDiv, sessionIdInput, orderIdInput, browserIdInput,
            conversationDiv, assistantForm, waveAnimation, chatModeInput
        } = elements;

        // --- START: Added for word replacement ---
        const wordReplacements = {
            "knight": "night",
            "excel": "axle",
            "voter": "order"
        };

        function applyWordReplacements(text) {
            let modifiedText = text;
            for (const originalWord in wordReplacements) {
                if (wordReplacements.hasOwnProperty(originalWord)) {
                    const replacementWord = wordReplacements[originalWord];
                    // Create a RegExp to match the original word, case-insensitive, whole word only
                    const regex = new RegExp("\\b" + originalWord + "\\b", "gi");
                    modifiedText = modifiedText.replace(regex, replacementWord);
                }
            }
            return modifiedText;
        }
        // --- END: Added for word replacement ---

        const API_URL = 'https://www.heavyhaulgbt.com'; // Replace with your actual API URL if needed
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = null;
        let isListening = false;
        let processingCommand = false; // Is the backend currently processing OR are we waiting for/playing audio?
        
        // Use a composite key for session storage: orderID_browserID or browserID for state mode
        const browserID = browserIdInput.value;
        const orderID = orderIdInput.value;
        let currentSessionId = null;
        // Initialize separate session IDs for different modes
        let orderSessionId = localStorage.getItem(`heavyhaul_session_${orderID}_${browserID}`) || null;
        let stateSessionId = localStorage.getItem(`heavyhaul_state_session_${browserID}`) || null;
        
        let currentAudioSource = null;
        let audioContext = null;
        let isAudioPlaying = false; // Is audio *currently* playing?
        let lastStopCommand = 0; // Track timestamp of last stop command

        // --- State to track feedback for each message ---
        window.messageFeedbackState = {}; // Stores { messageId: { rating: null/'good'/'bad', comment: null/'text', ratingSubmitted: false, commentSubmitted: false } }

        // Set initial session ID based on current mode
        updateSessionIdBasedOnMode(); // Call once at init to set initial sessionIdInput.value

        function updateSessionIdBasedOnMode() {
            const mode = chatModeInput.value || 'order';
            if (mode === 'order') {
                currentSessionId = orderSessionId;
            } else { // mode === 'state'
                // If stateSessionId exists, use it.
                // Otherwise, if orderSessionId exists, use that as a fallback.
                // If neither exists, currentSessionId will be null.
                currentSessionId = stateSessionId || orderSessionId; 
            }

            if (currentSessionId) {
                sessionIdInput.value = currentSessionId;
            } else {
                sessionIdInput.value = ''; // If currentSessionId is null, input becomes empty
            }
        }

        // Initialize speech recognition
        function initSpeechRecognition() {
            if (!SpeechRecognition) {
                statusDiv.textContent = 'Speech recognition not supported.';
                speakBtn.disabled = true; 
                return false;
            }
            
            recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false; // Keep false - we manage restarts
            recognition.interimResults = false; // Keep false - simplifies logic
            recognition.maxAlternatives = 1;

            // *** MODIFIED onresult ***
            recognition.onresult = (event) => {
                let originalTranscript = event.results[0][0].transcript.trim();
                console.log('Original recognized speech:', originalTranscript);

                // Apply word replacements
                let transcript = applyWordReplacements(originalTranscript);
                if (transcript !== originalTranscript) {
                    console.log('Replaced speech:', transcript);
                }

                const transcriptLower = transcript.toLowerCase();

                // --- STOP CHECK (PRIORITY) ---
                // Use includes() to catch "stop" within a sentence
                if (transcriptLower.includes("stop")) {
                    // Debounce the stop command to prevent multiple rapid stops
                    const now = Date.now();
                    if (now - lastStopCommand < 1000) {
                        console.log("Debouncing too rapid stop command");
                        return;
                    }
                    lastStopCommand = now;
                    
                    if (isAudioPlaying) {
                        console.log("STOP command detected during playback!");
                        stopAudioPlayback(); // Stop the audio
                        statusDiv.textContent = 'Audio stopped. Listening...';
                        processingCommand = false; // Command processing is halted immediately
                        
                        // Force reset recognition to be ready for next command
                        try {
                            recognition.stop();
                        } catch (e) {
                            console.warn("Error stopping recognition after stop command:", e);
                        }
                        
                        // Small delay before restarting to ensure recognition state is clean
                        setTimeout(() => {
                            if (isListening) {
                                safeStartRecognition();
                            }
                        }, 300);
                        
                        return; // Stop processing this result further
                    } else {
                        console.log("STOP command received, but no audio was playing.");
                        // Tell the user that there's no audio playing
                        addMessage("STOP", true, null, elements); // Show the "STOP" command (could be the modified one if "stop" was a replacement target)
                        addMessage("There's no audio currently playing to stop.", false, null, elements);
                        
                        // Restart recognition after a short delay
                        setTimeout(() => {
                            if (isListening) {
                                safeStartRecognition();
                            }
                        }, 300);
                        
                        return;
                    }
                }
                // --- END STOP CHECK ---

                // Ignore speech if audio is playing (and it wasn't 'stop')
                if (isAudioPlaying) {
                    console.log("Ignoring speech received while audio is playing:", transcript);
                    return;
                }

                // Ignore speech if already processing a command (API call, audio gen/decode)
                if (processingCommand) {
                    console.log("Already processing a command, ignoring:", transcript);
                    return;
                }

                // Process the command normally
                processingCommand = true; // Set flag: processing starts now
                statusDiv.textContent = 'Processing...';
                statusDiv.classList.add('heavyhaul-pulse');
                addMessage(transcript, true, null, elements); // Use modified transcript
                processCommand(transcript); // Use modified transcript
            };

            // *** MODIFIED onerror ***
            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error, event.message);
                let errorMsg = `Mic Error: ${event.error}.`;
                if (event.error === 'no-speech' && isListening) {
                    errorMsg = 'No speech detected. Listening...'; // Less alarming message
                } else if (event.error === 'not-allowed') {
                    errorMsg = 'Mic access denied. Please allow access.';
                    isListening = false; // Force stop listening state
                    updateListenButtonState();
                } else if (event.error === 'audio-capture') {
                    errorMsg = 'Mic capture failed. Is it being used elsewhere?';
                    isListening = false;
                    updateListenButtonState();
                } else if (isListening) { // For other errors while listening
                    errorMsg += ' Retrying...';
                } else { // For errors when not intending to listen
                    errorMsg += ' Stopped.';
                }
                statusDiv.textContent = errorMsg;
                processingCommand = false; // Ensure processing stops on error
                
                // Force clean state if needed
                if (event.error === 'aborted' || event.error === 'network') {
                    setTimeout(() => {
                        if (isListening && !isAudioPlaying && !processingCommand) {
                            safeStartRecognition();
                        }
                    }, 500);
                }
                // 'onend' will handle potential restarts if isListening is true
            };

            // *** REVISED/SIMPLIFIED onend ***
            recognition.onend = () => {
                console.log('Recognition ended.');
                // Restart ONLY if we are supposed to be listening AND
                // audio is not playing AND we are not currently processing.
                if (isListening && !isAudioPlaying && !processingCommand) {
                    console.log('Recognition end: Restarting recognition via onend...');
                    // Small delay to ensure clean state
                    setTimeout(() => {
                        safeStartRecognition();
                    }, 200);
                } else {
                    console.log(`Recognition end: Not restarting (isListening: ${isListening}, isAudioPlaying: ${isAudioPlaying}, processingCommand: ${processingCommand})`);
                    // Update status if we stopped listening for reasons other than starting playback/processing
                    if (!isListening && statusDiv.textContent.endsWith('...')) {
                        statusDiv.textContent = 'Stopped listening.';
                    } else if (isListening && !isAudioPlaying && processingCommand && !statusDiv.textContent.startsWith('Playing')) {
                        // Status should already be 'Processing...' or 'Generating/Decoding audio...'
                    } else if (isListening && isAudioPlaying) {
                        // Status should be 'Playing...' - already set
                    } else if(isListening && !isAudioPlaying && !processingCommand && !statusDiv.textContent.startsWith('Listening')) {
                        // If we should be listening but aren't, likely an error occurred before onend
                        // safeStartRecognition will handle setting status correctly if called
                    }
                }
            };

            return true;
        }

        // Safely start recognition, handling potential errors and updating status
        function safeStartRecognition() {
            if (!isListening || !recognition) {
                console.log("safeStartRecognition: Aborted (not listening or no recognition object)");
                return;
            }
            // Check state again right before starting
            if (isAudioPlaying || processingCommand) {
                console.log(`safeStartRecognition: Aborted just before start (isAudioPlaying: ${isAudioPlaying}, processingCommand: ${processingCommand})`);
                return;
            }

            try {
                // Update status *before* starting
                statusDiv.textContent = 'Listening...';
                console.log("Attempting recognition.start()");
                recognition.start();
            } catch (err) {
                // Catch error if start() is called when already started (common harmless error)
                if (err.name === 'InvalidStateError') {
                    console.warn('Recognition already started or stopping, ignoring duplicate start request.');
                    // Try again after a short delay
                    setTimeout(() => {
                        if (isListening && !isAudioPlaying && !processingCommand) {
                            try {
                                console.log("Retrying start after InvalidStateError...");
                                recognition.start();
                            } catch (e) {
                                console.error("Second attempt to start recognition failed:", e);
                            }
                        }
                    }, 300);
                    // Ensure status reflects listening if start failed for this reason but we are listening
                    if (isListening) statusDiv.textContent = 'Listening...';
                } else {
                    console.error('Error starting recognition:', err);
                    statusDiv.textContent = 'Mic start error. Stopped.';
                    isListening = false; // Force stop if start fails critically
                    updateListenButtonState();
                }
            }
        }

        // Async function to stop audio playback
        async function stopAudioPlayback() {
            if (currentAudioSource) {
                try {
                    currentAudioSource.onended = null; // IMPORTANT: Prevent natural onended handler
                    currentAudioSource.stop(0);
                    currentAudioSource.disconnect();
                    console.log("Audio stopped.");
                }
                catch (err) {
                    console.error('Error stopping audio:', err);
                }
                finally {
                    currentAudioSource = null; // Nullify the source reference
                    isAudioPlaying = false; // Update audio playing state immediately
                }
            } else {
                isAudioPlaying = false; // Ensure flag is reset even if no source exists
            }
            // Status text update is handled by the caller context
        }

        // Async function to process the recognized command
        async function processCommand(command) { // Command is already the modified one
            const orderIdVal = orderIdInput.value; // Use a local const for orderId for this command
            const chatMode = chatModeInput.value || 'order';
            
            // For order mode, order ID is required
            if (chatMode === 'order' && !orderIdVal) {
                statusDiv.textContent = 'Error: No Order ID.';
                addMessage('Sorry, I need an order ID for order assistance.', false, null, elements);
                statusDiv.classList.remove('heavyhaul-pulse');
                processingCommand = false; // Reset flag
                if (isListening) {
                    setTimeout(() => safeStartRecognition(), 300); // Restart after delay for stability
                }
                return;
            }

            updateSessionIdBasedOnMode(); // Crucial: sets currentSessionId and sessionIdInput.value based on current chatMode and existing sessionIds
            const sessionIdForRequest = sessionIdInput.value.trim() || currentSessionId; // Use the value from input, fallback to currentSessionId (which was just updated)
            const browserFingerprint = browserIdInput.value;
            
            // Choose the endpoint based on chat mode
            const endpoint = chatMode === 'order' ? '/chat' : '/chatstate';
            
            // Construct the request 
            const requestData = { 
                message: command,
                session_id: sessionIdForRequest 
            };
            
            // Add order_id only for order mode, browser_fingerprint only for order mode
            if (chatMode === 'order') {
                requestData.order_id = orderIdVal;
                requestData.browser_fingerprint = browserFingerprint;
            }

            // Initialize AudioContext if not already done
            if (!audioContext) {
                try {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    if (audioContext.state === 'suspended') {
                        await audioContext.resume().catch(e => {
                            console.error("Failed to resume audio context:", e);
                        });
                    }
                } catch (e) {
                    console.error("AudioContext failed.", e);
                    statusDiv.textContent = 'Error: Web Audio API.';
                    processingCommand = false;
                    statusDiv.classList.remove('heavyhaul-pulse');
                    if (isListening) {
                        setTimeout(() => safeStartRecognition(), 300);
                    }
                    return;
                }
            }

            try {
                console.log(`Sending to ${endpoint}:`, JSON.stringify(requestData));
                
                // Call the appropriate API endpoint
                const response = await fetch(`${API_URL}${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData)
                });
                
                if (!response.ok) {
                    try {
                        const error = await response.json();
                        throw new Error(error.error || `API ${response.status}`);
                    } catch (err) {
                        throw new Error(`API ${response.status}`);
                    }
                }
                
                const data = await response.json();
                console.log(`${endpoint} response:`, data);
                
                // Update session ID if needed from the response
                // currentSessionId here refers to the one *before* this API call if data.session_id is new
                // or the one that was sent if data.session_id is the same or not present.
                // The important part is updating the *mode-specific* session ID (orderSessionId or stateSessionId)
                if (data.session_id) { // Check if server returned a session_id
                    const returnedSessionId = data.session_id;
                    sessionIdInput.value = returnedSessionId; // Update input field immediately

                    if (chatMode === 'order') {
                        if (orderSessionId !== returnedSessionId) {
                            orderSessionId = returnedSessionId;
                            localStorage.setItem(`heavyhaul_session_${orderIdVal}_${browserID}`, returnedSessionId);
                            console.log(`Order Session ID updated:`, returnedSessionId);
                        }
                    } else { // chatMode === 'state'
                        if (stateSessionId !== returnedSessionId) {
                            stateSessionId = returnedSessionId;
                            localStorage.setItem(`heavyhaul_state_session_${browserID}`, returnedSessionId);
                            console.log(`State Session ID updated:`, returnedSessionId);
                        }
                    }
                    // Update currentSessionId to reflect the one actually active *after* this exchange
                    currentSessionId = returnedSessionId; 
                }


                // Display assistant's response
                addMessage(data.response, false, data.message_id, elements);

                // Generate and play audio response if available
                if (data.audio_endpoint && audioContext) {
                    statusDiv.textContent = 'Generating audio...';
                    
                    // Call the audio generation API
                    const audioResponse = await fetch(`${API_URL}${data.audio_endpoint}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: data.response })
                    });
                    
                    if (!audioResponse.ok) {
                        try {
                            const error = await audioResponse.json();
                            throw new Error(error.error || `Audio API ${audioResponse.status}`);
                        } catch (err) {
                            throw new Error(`Audio API ${audioResponse.status}`);
                        }
                    }
                    
                    statusDiv.textContent = 'Decoding audio...';
                    const arrayBuffer = await audioResponse.arrayBuffer();
                    
                    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                        throw new Error('Empty audio buffer');
                    }
                    
                    // Decode the audio data
                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    
                    if (!audioBuffer) {
                        throw new Error('Audio decoding failed');
                    }
                    
                    console.log('Audio decoded, preparing to play...');
                    await stopAudioPlayback(); // Stop any previous audio

                    // Create new audio source and play
                    const source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);

                    currentAudioSource = source;
                    isAudioPlaying = true;

                    statusDiv.textContent = 'Playing... (Say "STOP" to interrupt)';
                    statusDiv.classList.remove('heavyhaul-pulse');

                    // Try to start recognition during playback to enable "stop" commands
                    if (isListening && recognition) {
                        console.log("Attempting to start recognition during playback...");
                        try { 
                            recognition.start(); 
                        } catch(e) { 
                            console.warn("Rec start during playback failed:", e.name);
                            // Try again after a small delay - this helps with some browsers
                            setTimeout(() => {
                                if (isListening && isAudioPlaying) {
                                    try {
                                        recognition.start();
                                        console.log("Delayed start of recognition during playback succeeded");
                                    } catch(e2) {
                                        console.warn("Delayed rec start during playback also failed:", e2.name);
                                    }
                                }
                            }, 200);
                        }
                    }

                    // Handle audio playback ending
                    source.onended = () => {
                        console.log('Playback finished or stopped.');
                        const localSourceRef = source;
                        const wasStoppedManually = !currentAudioSource || currentAudioSource !== localSourceRef;

                        if (currentAudioSource === localSourceRef) {
                            currentAudioSource = null;
                            isAudioPlaying = false;

                            if (!wasStoppedManually) {
                                console.log("Audio ended naturally.");
                                processingCommand = false;
                                if (isListening) {
                                    console.log("Audio ended naturally: Triggering recognition restart.");
                                    try {
                                        recognition.stop();
                                    } catch (e) {
                                        console.warn("Error stopping recognition after natural audio end:", e);
                                    }
                                    
                                    setTimeout(() => {
                                        if (isListening && !isAudioPlaying && !processingCommand) {
                                            safeStartRecognition();
                                        }
                                    }, 300);
                                } else {
                                    statusDiv.textContent = 'Ready.';
                                }
                            } else {
                                console.log("Audio was stopped manually. Restart handled by recognition.onend.");
                                if(isListening) {
                                    statusDiv.textContent = 'Listening...';
                                } else {
                                    statusDiv.textContent = 'Audio stopped.';
                                }
                            }
                        } else {
                            console.log("onended fired for an old/stopped audio source. Ignoring.");
                        }
                    };

                    source.start(0); // Start playing the audio
                } else {
                    console.log("Skipping audio generation/playback.");
                    statusDiv.textContent = 'Ready.';
                    statusDiv.classList.remove('heavyhaul-pulse');
                    processingCommand = false;
                    
                    if (isListening) {
                        setTimeout(() => safeStartRecognition(), 300);
                    }
                }
            } catch (error) {
                if (error.message !== 'No audio endpoint' && 
                    error.message !== 'No audio response object' && 
                    error.message !== 'Empty audio buffer' && 
                    error.message !== 'Audio decoding failed') {
                    console.error('Processing/Audio Error:', error);
                    addMessage(`Sorry, I encountered an error: ${error.message || error}`, false, null, elements);
                    statusDiv.textContent = `Error: ${error.message || error}. Ready...`;
                } else {
                    console.log("Audio playback skipped:", error);
                    statusDiv.textContent = 'Ready.';
                }

                await stopAudioPlayback();
                statusDiv.classList.remove('heavyhaul-pulse');
                processingCommand = false;
                
                if (isListening) {
                    console.log("Restarting recognition after processing/audio error/skip.");
                    setTimeout(() => {
                        if (isListening && !isAudioPlaying && !processingCommand) {
                            safeStartRecognition();
                        }
                    }, 300);
                }
            }
        }

        // Update button text and style
        function updateListenButtonState() {
            speakBtn.classList.toggle('listening', isListening);
            waveAnimation.style.display = isListening ? 'inline-flex' : 'none';
            const micIconSpan = `<span class="heavyhaul-mic-icon">${MIC_ICON}</span>`;
            speakBtn.innerHTML = isListening ? `${micIconSpan} Stop Listening` : `${micIconSpan} Start Listening`;
            if(isListening) speakBtn.appendChild(waveAnimation); // Re-append wave if needed
        }

        // Reset recognition engine completely - use this when things get stuck
        async function resetRecognitionEngine() {
            console.log("Completely resetting recognition engine");
            if (recognition) {
                try {
                    recognition.abort();
                } catch (e) {
                    console.warn("Error during recognition abort in reset:", e);
                }
                recognition = null;
            }
            
            // Small delay to ensure clean state
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Recreate recognition object
            recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            
            // Reattach all event handlers with the same handlers as in initSpeechRecognition
            recognition.onresult = (event) => {
                let originalTranscript = event.results[0][0].transcript.trim();
                console.log('Original recognized speech (reset engine):', originalTranscript);

                // Apply word replacements
                let transcript = applyWordReplacements(originalTranscript);
                 if (transcript !== originalTranscript) {
                    console.log('Replaced speech (reset engine):', transcript);
                }

                const transcriptLower = transcript.toLowerCase();

                // --- STOP CHECK (PRIORITY) ---
                if (transcriptLower.includes("stop")) {
                    const now = Date.now();
                    if (now - lastStopCommand < 1000) {
                        console.log("Debouncing too rapid stop command");
                        return;
                    }
                    lastStopCommand = now;
                    
                    if (isAudioPlaying) {
                        console.log("STOP command detected during playback!");
                        stopAudioPlayback();
                        statusDiv.textContent = 'Audio stopped. Listening...';
                        processingCommand = false;
                        
                        try {
                            recognition.stop();
                        } catch (e) {
                            console.warn("Error stopping recognition after stop command:", e);
                        }
                        
                        setTimeout(() => {
                            if (isListening) {
                                safeStartRecognition();
                            }
                        }, 300);
                        
                        return;
                    } else {
                        console.log("STOP command received, but no audio was playing.");
                        addMessage("STOP", true, null, elements); // Use modified transcript
                        addMessage("There's no audio currently playing to stop.", false, null, elements);
                        
                        setTimeout(() => {
                            if (isListening) {
                                safeStartRecognition();
                            }
                        }, 300);
                        
                        return;
                    }
                }

                if (isAudioPlaying) {
                    console.log("Ignoring speech received while audio is playing:", transcript);
                    return;
                }

                if (processingCommand) {
                    console.log("Already processing a command, ignoring:", transcript);
                    return;
                }

                processingCommand = true;
                statusDiv.textContent = 'Processing...';
                statusDiv.classList.add('heavyhaul-pulse');
                addMessage(transcript, true, null, elements); // Use modified transcript
                processCommand(transcript); // Use modified transcript
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error, event.message);
                let errorMsg = `Mic Error: ${event.error}.`;
                if (event.error === 'no-speech' && isListening) {
                    errorMsg = 'No speech detected. Listening...';
                } else if (event.error === 'not-allowed') {
                    errorMsg = 'Mic access denied. Please allow access.';
                    isListening = false;
                    updateListenButtonState();
                } else if (event.error === 'audio-capture') {
                    errorMsg = 'Mic capture failed. Is it being used elsewhere?';
                    isListening = false;
                    updateListenButtonState();
                } else if (isListening) {
                    errorMsg += ' Retrying...';
                } else {
                    errorMsg += ' Stopped.';
                }
                statusDiv.textContent = errorMsg;
                processingCommand = false;
                
                if (event.error === 'aborted' || event.error === 'network') {
                    setTimeout(() => {
                        if (isListening && !isAudioPlaying && !processingCommand) {
                            safeStartRecognition();
                        }
                    }, 500);
                }
            };

            recognition.onend = () => {
                console.log('Recognition ended.');
                if (isListening && !isAudioPlaying && !processingCommand) {
                    console.log('Recognition end: Restarting recognition via onend...');
                    setTimeout(() => {
                        safeStartRecognition();
                    }, 200);
                } else {
                    console.log(`Recognition end: Not restarting (isListening: ${isListening}, isAudioPlaying: ${isAudioPlaying}, processingCommand: ${processingCommand})`);
                    if (!isListening && statusDiv.textContent.endsWith('...')) {
                        statusDiv.textContent = 'Stopped listening.';
                    }
                }
            };
            
            return true;
        }
        
        // Setup periodic recognition engine reset to prevent issues
        setInterval(async () => {
            if (!isListening || isAudioPlaying || processingCommand) return;
            await resetRecognitionEngine();
            if (isListening) {
                setTimeout(() => safeStartRecognition(), 300);
            }
        }, 60000); // Reset every minute when idle

        // --- Event Listener for the Main Speak Button ---
        if (initSpeechRecognition()) {
            speakBtn.addEventListener('click', async (event) => {
                event.preventDefault();
                // Check if order ID is required (only for order mode)
                const chatMode = chatModeInput.value || 'order';
                if (chatMode === 'order' && !CURRENT_ORDER_ID) {
                    statusDiv.textContent = 'Cannot start: No Order ID for order assistance.';
                    return;
                }
                
                // Initialize AudioContext on first interaction
                if (!audioContext) {
                    try {
                        audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        if (audioContext.state === 'suspended') {
                            await audioContext.resume().catch(e => {
                                console.error("Failed to resume audio context on button click:", e);
                            });
                        }
                    } catch (e) {
                        console.error("AudioContext failed on click.", e);
                        statusDiv.textContent = 'Error: Web Audio failed.';
                        return;
                    }
                }

                isListening = !isListening; // Toggle listening state

                if (isListening) {
                    processingCommand = false; // Ensure ready for new command
                    safeStartRecognition(); // Start listening (includes status update)
                }
                else {
                    statusDiv.textContent = 'Stopped listening.'; // Set status explicitly
                    if (recognition) {
                        try {
                            recognition.abort(); // Use abort for immediate stop
                            console.log("Recognition aborted by button click.");
                        } catch (err) {
                            console.error('Error aborting recognition:', err);
                            // Fallback if abort fails
                            try {
                                recognition.stop();
                            } catch (e) {
                                console.error("Fallback recognition.stop() also failed:", e);
                            }
                        }
                    }
                    await stopAudioPlayback(); // Stop any audio playback
                    processingCommand = false; // Ensure processing stops
                }

                updateListenButtonState(); // Update button UI
            });
        } else {
            speakBtn.disabled = true;
            speakBtn.title = "Speech recognition not supported";
        }

        // Add initial greeting based on chat mode
        const initialChatMode = chatModeInput.value || 'order';
        if (initialChatMode === 'order') {
            addMessage("Hello! I'm your HeavyHaulGBT assistant. How can I help you with your order?", false, null, elements);
        } else {
            addMessage("Hello! I'm your HeavyHaulGBT assistant. How can i help you with State Regulations.", false, null, elements);
        }

    } // End of initVoiceAssistant

    // Initialize widget
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWidget);
    else initWidget();

})();
