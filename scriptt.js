(function() {
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
        .heavyhaul-popup-menu,
        .heavyhaul-popup-language {
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
        .heavyhaul-popup-menu:hover,
        .heavyhaul-popup-language:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
    
        /* Chat mode menu */
        .heavyhaul-chat-mode-menu {
            position: absolute;
            right: 75px;
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

        /* Language selection menu */
        .heavyhaul-language-menu {
            position: absolute;
            right: 45px;
            top: 40px;
            background-color: var(--bg-card);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            overflow: hidden;
            width: 150px;
            z-index: 1000;
            display: none;
            border: 1px solid var(--border-color);
        }
    
        .heavyhaul-language-menu.active {
            display: block;
            animation: heavyhaul-menu-fade-in 0.2s ease-out;
        }
    
        .heavyhaul-language-option {
            padding: 12px 15px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    
        .heavyhaul-language-option:hover {
            background-color: rgba(84, 102, 255, 0.1);
        }
    
        .heavyhaul-language-option.active {
            background-color: rgba(84, 102, 255, 0.2);
            font-weight: 600;
        }
    
        .heavyhaul-language-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--primary);
            display: none;
        }
    
        .heavyhaul-language-option.active .heavyhaul-language-indicator {
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
            gap: 10px; /* Added gap for upload button */
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
        
        /* Upload button style */
        .heavyhaul-upload-btn {
            padding: 12px;
            background: linear-gradient(135deg, var(--green) 0%, #159648 100%);
            color: white;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 500;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(39, 174, 96, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            transform: translateZ(0);
            width: 48px;
            height: 48px;
        }
        
        .heavyhaul-upload-btn:hover {
            background: linear-gradient(135deg, #159648 0%, var(--green) 100%);
            transform: translateY(-3px);
            box-shadow: 0 6px 14px rgba(39, 174, 96, 0.4);
        }
        
        .heavyhaul-upload-btn:disabled {
            background: linear-gradient(135deg, #7a7a7a 0%, #5a5a5a 100%);
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }
        
        .heavyhaul-upload-btn svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }
        
        /* Hidden file input */
        .heavyhaul-file-input {
            position: absolute;
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            z-index: -1;
        }
        
        /* Image preview container */
        .heavyhaul-image-preview {
            display: none;
            margin-bottom: 12px;
            max-height: 150px;
            text-align: center;
            position: relative;
        }
        
        .heavyhaul-image-preview img {
            max-height: 150px;
            max-width: 100%;
            border-radius: 8px;
            border: 2px solid var(--primary);
        }
        
        .heavyhaul-image-remove {
            position: absolute;
            top: -8px;
            right: -8px;
            width: 24px;
            height: 24px;
            background: var(--red);
            color: white;
            border-radius: 50%;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
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
            width: 18px;
            height: 18px;
            position: relative;
        }
    
        .heavyhaul-mic-icon svg {
            width: 19px;
            height: 19px;
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
    const UPLOAD_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>';

    // Language configurations
    const LANGUAGE_CONFIG = {
        'English': {
            code: 'en-US',
            speechLang: 'en-US',
            messages: {
                ready_order: 'Ready to assist with order',
                ready_state: 'Start asking about your route or any state regulations.',
                ready_fmcsa: 'Ask about FMCSA regulations or upload an image for analysis.',
                warning_no_order: 'Warning: No order ID found in URL.',
                hello_order: "Hello! I'm your HeavyHaulGBT assistant. How can I help you with your order?",
                hello_state: "Hello! I'm your HeavyHaulGBT assistant. How can I help you with State Regulations?",
                hello_fmcsa: "Hello! I'm your HeavyHaulGBT assistant. How can I help you with FMCSA Regulations? You can also upload images of cargo securement for analysis.",
                start_listening: "Start Listening",
                stop_listening: "Stop Listening",
                listening: "Listening...",
                processing: "Processing...",
                generating_audio: "Generating audio...",
                decoding_audio: "Decoding audio...",
                playing_audio: "Playing... (Say \"STOP\" to interrupt)",
                audio_stopped: "Audio stopped. Listening...",
                no_audio_playing: "There's no audio currently playing to stop.",
                stopped_listening: "Stopped listening.",
                ready: "Ready.",
                speech_not_supported: "Speech recognition not supported.",
                mic_access_denied: "Mic access denied. Please allow access.",
                no_speech_detected: "No speech detected. Listening...",
                error_no_order_id: "Error: No Order ID.",
                sorry_need_order_id: "Sorry, I need an order ID for order assistance.",
                processing_image: "Processing image and query...",
                submitting_feedback: "Submitting feedback...",
                feedback_received: "Feedback received. Ready.",
                current_order: "Current Order",
                state_regulations: "State Regulations",
                fmcsa_regulations: "FMCSA Regulations"
            }
        },
        'Spanish': {
            code: 'es-ES',
            speechLang: 'es-ES',
            messages: {
                ready_order: 'Listo para asistir con la orden',
                ready_state: 'Comience a preguntar sobre su ruta o cualquier regulación estatal.',
                ready_fmcsa: 'Pregunte sobre las regulaciones de FMCSA o suba una imagen para análisis.',
                warning_no_order: 'Advertencia: No se encontró ID de orden en la URL.',
                hello_order: "¡Hola! Soy tu asistente HeavyHaulGBT. ¿Cómo puedo ayudarte con tu orden?",
                hello_state: "¡Hola! Soy tu asistente HeavyHaulGBT. ¿Cómo puedo ayudarte con las Regulaciones Estatales?",
                hello_fmcsa: "¡Hola! Soy tu asistente HeavyHaulGBT. ¿Cómo puedo ayudarte con las Regulaciones de FMCSA? También puedes subir imágenes de aseguramiento de carga para análisis.",
                start_listening: "Comenzar a Escuchar",
                stop_listening: "Parar de Escuchar",
                listening: "Escuchando...",
                processing: "Procesando...",
                generating_audio: "Generando audio...",
                decoding_audio: "Decodificando audio...",
                playing_audio: "Reproduciendo... (Di \"PARE\" para interrumpir)",
                audio_stopped: "Audio detenido. Escuchando...",
                no_audio_playing: "No hay audio reproduciéndose actualmente para detener.",
                stopped_listening: "Dejé de escuchar.",
                ready: "Listo.",
                speech_not_supported: "Reconocimiento de voz no compatible.",
                mic_access_denied: "Acceso al micrófono denegado. Por favor permite el acceso.",
                no_speech_detected: "No se detectó habla. Escuchando...",
                error_no_order_id: "Error: No hay ID de Orden.",
                sorry_need_order_id: "Lo siento, necesito un ID de orden para asistencia con órdenes.",
                processing_image: "Procesando imagen y consulta...",
                submitting_feedback: "Enviando comentarios...",
                feedback_received: "Comentarios recibidos. Listo.",
                current_order: "Orden Actual",
                state_regulations: "Regulaciones Estatales",
                fmcsa_regulations: "Regulaciones FMCSA"
            }
        },
        'Russian': {
            code: 'ru-RU',
            speechLang: 'ru-RU',
            messages: {
                ready_order: 'Готов помочь с заказом',
                ready_state: 'Начните спрашивать о вашем маршруте или любых государственных правилах.',
                ready_fmcsa: 'Спрашивайте о правилах FMCSA или загрузите изображение для анализа.',
                warning_no_order: 'Предупреждение: ID заказа не найден в URL.',
                hello_order: "Привет! Я ваш помощник HeavyHaulGBT. Как я могу помочь вам с вашим заказом?",
                hello_state: "Привет! Я ваш помощник HeavyHaulGBT. Как я могу помочь вам с Государственными Правилами?",
                hello_fmcsa: "Привет! Я ваш помощник HeavyHaulGBT. Как я могу помочь вам с Правилами FMCSA? Вы также можете загружать изображения крепления груза для анализа.",
                start_listening: "Начать Слушать",
                stop_listening: "Прекратить Слушать",
                listening: "Слушаю...",
                processing: "Обработка...",
                generating_audio: "Генерация аудио...",
                decoding_audio: "Декодирование аудио...",
                playing_audio: "Воспроизведение... (Скажите \"СТОП\" чтобы прервать)",
                audio_stopped: "Аудио остановлено. Слушаю...",
                no_audio_playing: "В данный момент нет воспроизводимого аудио для остановки.",
                stopped_listening: "Прекратил слушать.",
                ready: "Готов.",
                speech_not_supported: "Распознавание речи не поддерживается.",
                mic_access_denied: "Доступ к микрофону запрещен. Пожалуйста, разрешите доступ.",
                no_speech_detected: "Речь не обнаружена. Слушаю...",
                error_no_order_id: "Ошибка: Нет ID Заказа.",
                sorry_need_order_id: "Извините, мне нужен ID заказа для помощи с заказами.",
                processing_image: "Обработка изображения и запроса...",
                submitting_feedback: "Отправка отзыва...",
                feedback_received: "Отзыв получен. Готов.",
                current_order: "Текущий Заказ",
                state_regulations: "Государственные Правила",
                fmcsa_regulations: "Правила FMCSA"
            }
        },
        'Romanian': {
            code: 'ro-RO',
            speechLang: 'ro-RO',
            messages: {
                ready_order: 'Gata să asist cu comanda',
                ready_state: 'Începeți să întrebați despre ruta dvs. sau orice reglementări de stat.',
                ready_fmcsa: 'Întrebați despre reglementările FMCSA sau încărcați o imagine pentru analiză.',
                warning_no_order: 'Avertisment: ID-ul comenzii nu a fost găsit în URL.',
                hello_order: "Salut! Sunt asistentul tău HeavyHaulGBT. Cum te pot ajuta cu comanda ta?",
                hello_state: "Salut! Sunt asistentul tău HeavyHaulGBT. Cum te pot ajuta cu Reglementările de Stat?",
                hello_fmcsa: "Salut! Sunt asistentul tău HeavyHaulGBT. Cum te pot ajuta cu Reglementările FMCSA? De asemenea, poți încărca imagini ale securizării încărcăturii pentru analiză.",
                start_listening: "Începe să Asculți",
                stop_listening: "Oprește Ascultarea",
                listening: "Ascult...",
                processing: "Procesez...",
                generating_audio: "Generez audio...",
                decoding_audio: "Decodificare audio...",
                playing_audio: "Redare... (Spune \"STOP\" pentru a întrerupe)",
                audio_stopped: "Audio oprit. Ascult...",
                no_audio_playing: "Nu există audio în redare în prezent pentru a fi oprit.",
                stopped_listening: "Am oprit ascultarea.",
                ready: "Gata.",
                speech_not_supported: "Recunoașterea vocală nu este suportată.",
                mic_access_denied: "Accesul la microfon a fost refuzat. Te rog să permiți accesul.",
                no_speech_detected: "Nu s-a detectat vorbire. Ascult...",
                error_no_order_id: "Eroare: Fără ID Comandă.",
                sorry_need_order_id: "Îmi pare rău, am nevoie de un ID de comandă pentru asistență cu comenzile.",
                processing_image: "Procesez imaginea și interogarea...",
                submitting_feedback: "Trimit feedback-ul...",
                feedback_received: "Feedback primit. Gata.",
                current_order: "Comanda Curentă",
                state_regulations: "Reglementări de Stat",
                fmcsa_regulations: "Reglementări FMCSA"
            }
        }
    };

    // Function to extract query param
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get order ID from URL
    // const CURRENT_ORDER_ID = getQueryParam("orderId");
    const CURRENT_ORDER_ID = 78856053; // For testing purposes
    console.log("HeavyHaul Assistant - Order ID:", CURRENT_ORDER_ID);

    // Language state management
    let currentLanguage = localStorage.getItem('heavyhaul_language') || 'English';

    function getMessage(key) {
        return LANGUAGE_CONFIG[currentLanguage].messages[key] || LANGUAGE_CONFIG['English'].messages[key] || key;
    }

    function getSpeechLanguage() {
        return LANGUAGE_CONFIG[currentLanguage].speechLang || 'en-US';
    }

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
                    <button class="heavyhaul-popup-language" title="Language">🌐</button>
                    <button class="heavyhaul-popup-close" title="Close">×</button>
                </div>
                <div class="heavyhaul-chat-mode-menu">
                    <div class="heavyhaul-chat-mode-option active" data-mode="order">
                        <span class="heavyhaul-chat-mode-text">${getMessage('current_order')}</span>
                        <span class="heavyhaul-chat-mode-indicator"></span>
                    </div>
                    <div class="heavyhaul-chat-mode-option" data-mode="state">
                        <span class="heavyhaul-chat-mode-text">${getMessage('state_regulations')}</span>
                        <span class="heavyhaul-chat-mode-indicator"></span>
                    </div>
                    <div class="heavyhaul-chat-mode-option" data-mode="fmcsa">
                        <span class="heavyhaul-chat-mode-text">${getMessage('fmcsa_regulations')}</span>
                        <span class="heavyhaul-chat-mode-indicator"></span>
                    </div>
                </div>
                <div class="heavyhaul-language-menu">
                    <div class="heavyhaul-language-option ${currentLanguage === 'English' ? 'active' : ''}" data-lang="English">
                        English
                        <span class="heavyhaul-language-indicator"></span>
                    </div>
                    <div class="heavyhaul-language-option ${currentLanguage === 'Spanish' ? 'active' : ''}" data-lang="Spanish">
                        Español
                        <span class="heavyhaul-language-indicator"></span>
                    </div>
                    <div class="heavyhaul-language-option ${currentLanguage === 'Russian' ? 'active' : ''}" data-lang="Russian">
                        Русский
                        <span class="heavyhaul-language-indicator"></span>
                    </div>
                    <div class="heavyhaul-language-option ${currentLanguage === 'Romanian' ? 'active' : ''}" data-lang="Romanian">
                        Română
                        <span class="heavyhaul-language-indicator"></span>
                    </div>
                </div>
            </div>
            <div class="heavyhaul-popup-body">
                <form id="heavyhaul-assistant-form" onsubmit="return false;">
                    <input type="hidden" id="heavyhaul-order-id" value="${CURRENT_ORDER_ID || ''}">
                    <input type="hidden" id="heavyhaul-session-id">
                    <input type="hidden" id="heavyhaul-browser-id">
                    <input type="hidden" id="heavyhaul-chat-mode" value="order">
                    <input type="hidden" id="heavyhaul-language" value="${currentLanguage}">
                    
                    <!-- Image preview section (initially hidden) -->
                    <div id="heavyhaul-image-preview" class="heavyhaul-image-preview">
                        <img id="heavyhaul-preview-img" src="#" alt="Upload preview">
                        <button id="heavyhaul-image-remove" class="heavyhaul-image-remove" title="Remove image">×</button>
                    </div>

                    <div class="heavyhaul-button-container">
                        <button id="heavyhaul-speak-btn" type="button" class="heavyhaul-button">
                            <span class="heavyhaul-mic-icon">${MIC_ICON}</span>
                            ${getMessage('start_listening')}
                            <div class="heavyhaul-wave-animation" style="display: none;">
                                <span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </button>
                        
                        <!-- Upload button (initially hidden, will show for FMCSA mode) -->
                        <label for="heavyhaul-file-input" id="heavyhaul-upload-label" class="heavyhaul-upload-btn" style="display: none;" title="Upload Image">
                            ${UPLOAD_ICON}
                        </label>
                        <input type="file" id="heavyhaul-file-input" class="heavyhaul-file-input" accept="image/*">
                    </div>
                </form>

                <div id="heavyhaul-status" class="heavyhaul-status">
                    ${CURRENT_ORDER_ID
                        ? `${getMessage('ready_order')} ${CURRENT_ORDER_ID}.`
                        : getMessage('warning_no_order')}
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
            languageBtn: popup.querySelector('.heavyhaul-popup-language'),
            chatModeMenu: popup.querySelector('.heavyhaul-chat-mode-menu'),
            languageMenu: popup.querySelector('.heavyhaul-language-menu'),
            chatModeOptions: popup.querySelectorAll('.heavyhaul-chat-mode-option'),
            languageOptions: popup.querySelectorAll('.heavyhaul-language-option'),
            speakBtn: document.getElementById('heavyhaul-speak-btn'),
            statusDiv: document.getElementById('heavyhaul-status'),
            sessionIdInput: document.getElementById('heavyhaul-session-id'),
            orderIdInput: document.getElementById('heavyhaul-order-id'),
            browserIdInput: document.getElementById('heavyhaul-browser-id'),
            chatModeInput: document.getElementById('heavyhaul-chat-mode'),
            languageInput: document.getElementById('heavyhaul-language'),
            conversationDiv: document.getElementById('heavyhaul-conversation'),
            assistantForm: document.getElementById('heavyhaul-assistant-form'),
            waveAnimation: popup.querySelector('.heavyhaul-wave-animation'),
            fileInput: document.getElementById('heavyhaul-file-input'),
            uploadLabel: document.getElementById('heavyhaul-upload-label'),
            imagePreview: document.getElementById('heavyhaul-image-preview'),
            previewImg: document.getElementById('heavyhaul-preview-img'),
            imageRemoveBtn: document.getElementById('heavyhaul-image-remove')
        };
    }

    function updateLanguageTexts(elements) {
        // Update chat mode options
        elements.chatModeOptions[0].querySelector('.heavyhaul-chat-mode-text').textContent = getMessage('current_order');
        elements.chatModeOptions[1].querySelector('.heavyhaul-chat-mode-text').textContent = getMessage('state_regulations');
        elements.chatModeOptions[2].querySelector('.heavyhaul-chat-mode-text').textContent = getMessage('fmcsa_regulations');

        // Update button text
        const micIconSpan = `<span class="heavyhaul-mic-icon">${MIC_ICON}</span>`;
        elements.speakBtn.innerHTML = `${micIconSpan} ${getMessage('start_listening')}`;
        elements.speakBtn.appendChild(elements.waveAnimation);

        // Update status text based on current mode
        const chatMode = elements.chatModeInput.value || 'order';
        if (chatMode === 'order') {
            elements.statusDiv.textContent = CURRENT_ORDER_ID
                ? `${getMessage('ready_order')} ${CURRENT_ORDER_ID}.`
                : getMessage('warning_no_order');
        } else if (chatMode === 'state') {
            elements.statusDiv.textContent = getMessage('ready_state');
        } else if (chatMode === 'fmcsa') {
            elements.statusDiv.textContent = getMessage('ready_fmcsa');
        }

        // Clear and add new greeting message
        elements.conversationDiv.innerHTML = '';
        if (chatMode === 'order') {
            addMessage(getMessage('hello_order'), false, null, elements);
        } else if (chatMode === 'state') {
            addMessage(getMessage('hello_state'), false, null, elements);
        } else if (chatMode === 'fmcsa') {
            addMessage(getMessage('hello_fmcsa'), false, null, elements);
        }
    }

    function initWidget() {
        const elements = createWidgetDOM();
        elements.floatingBtn.addEventListener('click', () => togglePopup(elements.popup, true));
        elements.closeBtn.addEventListener('click', () => togglePopup(elements.popup, false));
        
        document.addEventListener('click', (event) => {
             if (!elements.popup.contains(event.target) && !elements.floatingBtn.contains(event.target) && elements.popup.classList.contains('active')) {
                 togglePopup(elements.popup, false);
             }
        });

        elements.menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            elements.chatModeMenu.classList.toggle('active');
            elements.languageMenu.classList.remove('active'); // Close language menu
        });

        elements.languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            elements.languageMenu.classList.toggle('active');
            elements.chatModeMenu.classList.remove('active'); // Close chat mode menu
        });

        document.addEventListener('click', (event) => {
            if (!elements.menuBtn.contains(event.target) && elements.chatModeMenu.classList.contains('active')) {
                elements.chatModeMenu.classList.remove('active');
            }
            if (!elements.languageBtn.contains(event.target) && elements.languageMenu.classList.contains('active')) {
                elements.languageMenu.classList.remove('active');
            }
        });

        // Language selection handler
        elements.languageOptions.forEach(option => {
            option.addEventListener('click', () => {
                const newLanguage = option.dataset.lang;
                
                // Update language state
                currentLanguage = newLanguage;
                localStorage.setItem('heavyhaul_language', currentLanguage);
                elements.languageInput.value = currentLanguage;
                
                // Update active language option
                elements.languageOptions.forEach(opt => {
                    opt.classList.toggle('active', opt === option);
                });
                
                // Update all text elements
                updateLanguageTexts(elements);
                
                // Update speech recognition language if it exists
                if (window.heavyhaulRecognition) {
                    window.heavyhaulRecognition.lang = getSpeechLanguage();
                    console.log('Speech recognition language updated to:', getSpeechLanguage());
                }
                
                elements.languageMenu.classList.remove('active');
            });
        });

        elements.fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    elements.previewImg.src = e.target.result;
                    elements.imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
        
        elements.imageRemoveBtn.addEventListener('click', function() {
            elements.fileInput.value = '';
            elements.imagePreview.style.display = 'none';
        });

        elements.chatModeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const mode = option.dataset.mode;
                
                elements.chatModeOptions.forEach(opt => {
                    opt.classList.toggle('active', opt === option);
                });
                
                elements.chatModeInput.value = mode;
                
                if (mode === 'fmcsa') {
                    elements.uploadLabel.style.display = 'flex';
                } else {
                    elements.uploadLabel.style.display = 'none';
                    elements.fileInput.value = '';
                    elements.imagePreview.style.display = 'none';
                }
                
                if (mode === 'order') {
                    elements.statusDiv.textContent = CURRENT_ORDER_ID
                        ? `${getMessage('ready_order')} ${CURRENT_ORDER_ID}.`
                        : getMessage('warning_no_order');
                    
                    elements.speakBtn.disabled = !CURRENT_ORDER_ID;
                } else if (mode === 'state') {
                    elements.statusDiv.textContent = getMessage('ready_state');
                    
                    elements.speakBtn.disabled = false;
                } else if (mode === 'fmcsa') {
                    elements.statusDiv.textContent = getMessage('ready_fmcsa');
                    
                    elements.speakBtn.disabled = false;
                }
                
                elements.conversationDiv.innerHTML = '';
                
                if (mode === 'order') {
                    addMessage(getMessage('hello_order'), false, null, elements);
                } else if (mode === 'state') {
                    addMessage(getMessage('hello_state'), false, null, elements);
                } else if (mode === 'fmcsa') {
                    addMessage(getMessage('hello_fmcsa'), false, null, elements);
                }
                
                elements.chatModeMenu.classList.remove('active');
            });
        });

        if (!CURRENT_ORDER_ID) {
            elements.speakBtn.disabled = true;
            elements.speakBtn.title = "No order ID found in the URL";
            elements.statusDiv.style.borderColor = 'var(--red)';
        }

        const browserFingerprint = generateBrowserFingerprint();
        elements.browserIdInput.value = browserFingerprint;

        initVoiceAssistant(elements);
    }

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
            pixelRatio: window.devicePixelRatio || 1,
            doNotTrack: navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack,
            plugins: Array.from(navigator.plugins || []).map(p => p.name).join(',')
        };
        
        const fingerprintString = JSON.stringify(fingerprint);
        return hashString(fingerprintString);
    }

    function hashString(str) {
        let hash = 0;
        if (str.length === 0) return hash;
        
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        return Math.abs(hash).toString(16);
    }

    function togglePopup(popup, show) {
        const isCurrentlyVisible = popup.classList.contains('active');
        const shouldShow = show !== undefined ? show : !isCurrentlyVisible;
        if (shouldShow && !isCurrentlyVisible) popup.classList.add('active');
        else if (!shouldShow && isCurrentlyVisible) popup.classList.remove('active');
    }

    function addMessage(text, isUser, messageId = null, elements = null) {
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

        if (!isUser && messageId) {
            const feedbackContainer = document.createElement('div');
            feedbackContainer.className = 'heavyhaul-feedback-buttons';
            feedbackContainer.dataset.messageId = messageId;

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

    function createFeedbackButton(type, symbol) {
        const button = document.createElement('button');
        button.className = 'heavyhaul-feedback-btn';
        button.dataset.feedbackType = type;
        button.textContent = symbol;
        button.title = type.charAt(0).toUpperCase() + type.slice(1);
        button.addEventListener('click', handleFeedbackClick);
        return button;
    }

    async function handleFeedbackClick(event) {
        const button = event.currentTarget;
        const feedbackType = button.dataset.feedbackType;
        const feedbackContainer = button.closest('.heavyhaul-feedback-buttons');
        const messageId = feedbackContainer.dataset.messageId;
        const sessionIdInput = document.getElementById('heavyhaul-session-id');
        const sessionId = sessionIdInput ? sessionIdInput.value.trim() : null;

        if (typeof window.messageFeedbackState === 'undefined') {
            window.messageFeedbackState = {};
        }
        
        if (!window.messageFeedbackState[messageId]) {
            window.messageFeedbackState[messageId] = { rating: null, comment: null, ratingSubmitted: false, commentSubmitted: false };
        }

        if (!messageId || !sessionId) {
            console.error("Feedback Error: Missing messageId or sessionId.");
            return;
        }

        if ((feedbackType === 'good' || feedbackType === 'bad') && window.messageFeedbackState[messageId].ratingSubmitted) {
            console.log("Rating feedback already submitted for this message.");
            return;
        }
        if (feedbackType === 'comment' && window.messageFeedbackState[messageId].commentSubmitted) {
            console.log("Comment feedback already submitted for this message.");
            return;
        }

        let userCommentText = null;
        let ratingValue = null;

        if (feedbackType === 'comment') {
            userCommentText = prompt("Please provide your comment for this response:");
            if (userCommentText === null) return;
            userCommentText = userCommentText.trim();
            if (!userCommentText) {
                 alert("Comment cannot be empty.");
                 return;
            }
            window.messageFeedbackState[messageId].comment = userCommentText;
            button.classList.add('selected');
            button.disabled = true;
            window.messageFeedbackState[messageId].commentSubmitted = true;
        }
        else if (feedbackType === 'good' || feedbackType === 'bad') {
            ratingValue = feedbackType;
            window.messageFeedbackState[messageId].rating = ratingValue;

            const buttons = feedbackContainer.querySelectorAll('.heavyhaul-feedback-btn[data-feedback-type="good"], .heavyhaul-feedback-btn[data-feedback-type="bad"]');
            buttons.forEach(btn => {
                btn.classList.toggle('selected', btn === button);
                btn.disabled = true;
            });
            window.messageFeedbackState[messageId].ratingSubmitted = true;
        }

        if (ratingValue !== null || userCommentText !== null) {
            await sendFeedbackToServer(sessionId, messageId);
        }
    }

    async function sendFeedbackToServer(sessionId, messageId) {
        if (!window.messageFeedbackState || !window.messageFeedbackState[messageId]) {
            console.error("Cannot send feedback, state missing for message:", messageId);
            return;
        }

        const statusDiv = document.getElementById('heavyhaul-status');
        const API_URL = 'https://www.heavyhaulgbt.com';

        const currentState = window.messageFeedbackState[messageId];
        const payload = {
            session_id: sessionId,
            message_id: messageId,
            rating: currentState.rating,
            comment: currentState.comment
        };

        if (statusDiv) {
            statusDiv.textContent = getMessage('submitting_feedback');
            statusDiv.classList.add('heavyhaul-pulse');
        }

        const feedbackEndpoint = '/api/feedback';
        try {
            const response = await fetch(`${API_URL}${feedbackEndpoint}`, {
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
                statusDiv.textContent = getMessage('feedback_received');
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
            conversationDiv, assistantForm, waveAnimation, chatModeInput, languageInput,
            fileInput, uploadLabel, imagePreview, previewImg, imageRemoveBtn
        } = elements;

        const wordReplacements = {
            "knight": "night",
            "excel": "axle",
            "voter": "order",
            "science": "signs",
            "destructions": "restrictions",
            "loot": "route",
            "water": "order",
            "warder": "order,
            "pyramid": "permit",
            "pyramids": "permits"
        };

        function applyWordReplacements(text) {
            let modifiedText = text;
            for (const originalWord in wordReplacements) {
                if (wordReplacements.hasOwnProperty(originalWord)) {
                    const replacementWord = wordReplacements[originalWord];
                    const regex = new RegExp("\\b" + originalWord + "\\b", "gi");
                    modifiedText = modifiedText.replace(regex, replacementWord);
                }
            }
            return modifiedText;
        }

        const API_URL = 'https://www.heavyhaulgbt.com';
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = null;
        let isListening = false;
        let processingCommand = false;
        
        const browserID = browserIdInput.value;
        const orderID = orderIdInput.value;
        let currentSessionId = null;
        let orderSessionId = localStorage.getItem(`heavyhaul_session_${orderID}_${browserID}`) || null;
        let stateSessionId = localStorage.getItem(`heavyhaul_state_session_${browserID}`) || null;
        let fmcsaSessionId = localStorage.getItem(`heavyhaul_fmcsa_session_${browserID}`) || null;
        
        let currentAudioSource = null;
        let audioContext = null;
        let isAudioPlaying = false;
        let lastStopCommand = 0;

        window.messageFeedbackState = {};

        updateSessionIdBasedOnMode();

        function updateSessionIdBasedOnMode() {
            const mode = chatModeInput.value || 'order';
            if (mode === 'order') {
                currentSessionId = orderSessionId;
            } else if (mode === 'state') {
                currentSessionId = stateSessionId;
            } else if (mode === 'fmcsa') {
                currentSessionId = fmcsaSessionId;
            }

            if (currentSessionId) {
                sessionIdInput.value = currentSessionId;
            } else {
                sessionIdInput.value = '';
            }
        }

        function initSpeechRecognition() {
            if (!SpeechRecognition) {
                statusDiv.textContent = getMessage('speech_not_supported');
                speakBtn.disabled = true; 
                return false;
            }
            
            recognition = new SpeechRecognition();
            recognition.lang = getSpeechLanguage(); // Use current language
            recognition.continuous = true;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            // Store recognition globally for language updates
            window.heavyhaulRecognition = recognition;

            recognition.onresult = (event) => {
                let originalTranscript = event.results[0][0].transcript.trim();
                console.log('Original recognized speech:', originalTranscript);

                let transcript = applyWordReplacements(originalTranscript);
                if (transcript !== originalTranscript) {
                    console.log('Replaced speech:', transcript);
                }

                const transcriptLower = transcript.toLowerCase();

                // Check for stop command in different languages
                const stopWords = ['stop', 'pare', 'стоп', 'oprește'];
                const containsStop = stopWords.some(word => transcriptLower.includes(word));

                if (containsStop) {
                    const now = Date.now();
                    if (now - lastStopCommand < 1000) {
                        console.log("Debouncing too rapid stop command");
                        return;
                    }
                    lastStopCommand = now;
                    
                    if (isAudioPlaying) {
                        console.log("STOP command detected during playback!");
                        stopAudioPlayback();
                        statusDiv.textContent = getMessage('audio_stopped');
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
                        addMessage("STOP", true, null, elements);
                        addMessage(getMessage('no_audio_playing'), false, null, elements);
                        
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
                statusDiv.textContent = getMessage('processing');
                statusDiv.classList.add('heavyhaul-pulse');
                addMessage(transcript, true, null, elements);
                processCommand(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error, event.message);
                let errorMsg = `Mic Error: ${event.error}.`;
                if (event.error === 'no-speech' && isListening) {
                    errorMsg = getMessage('no_speech_detected');
                } else if (event.error === 'not-allowed') {
                    errorMsg = getMessage('mic_access_denied');
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
                        statusDiv.textContent = getMessage('stopped_listening');
                    }
                }
            };

            return true;
        }

        function safeStartRecognition() {
            if (!isListening || !recognition) {
                console.log("safeStartRecognition: Aborted (not listening or no recognition object)");
                return;
            }
            if (isAudioPlaying || processingCommand) {
                console.log(`safeStartRecognition: Aborted just before start (isAudioPlaying: ${isAudioPlaying}, processingCommand: ${processingCommand})`);
                return;
            }

            try {
                statusDiv.textContent = getMessage('listening');
                console.log("Attempting recognition.start()");
                recognition.start();
            } catch (err) {
                if (err.name === 'InvalidStateError') {
                    console.warn('Recognition already started or stopping, ignoring duplicate start request.');
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
                    if (isListening) statusDiv.textContent = getMessage('listening');
                } else {
                    console.error('Error starting recognition:', err);
                    statusDiv.textContent = 'Mic start error. Stopped.';
                    isListening = false;
                    updateListenButtonState();
                }
            }
        }

        async function stopAudioPlayback() {
            if (currentAudioSource) {
                try {
                    currentAudioSource.onended = null;
                    currentAudioSource.stop(0);
                    currentAudioSource.disconnect();
                    console.log("Audio stopped.");
                }
                catch (err) {
                    console.error('Error stopping audio:', err);
                }
                finally {
                    currentAudioSource = null;
                    isAudioPlaying = false;
                }
            } else {
                isAudioPlaying = false;
            }
        }

        async function processCommand(command) {
            const orderIdVal = orderIdInput.value;
            const chatMode = chatModeInput.value || 'order';
            const selectedLanguage = languageInput.value || currentLanguage;
            
            if (chatMode === 'order' && !orderIdVal) {
                statusDiv.textContent = getMessage('error_no_order_id');
                addMessage(getMessage('sorry_need_order_id'), false, null, elements);
                statusDiv.classList.remove('heavyhaul-pulse');
                processingCommand = false;
                if (isListening) {
                    setTimeout(() => safeStartRecognition(), 300);
                }
                return;
            }

            updateSessionIdBasedOnMode();
            let sessionIdForRequest = sessionIdInput.value.trim();
            const browserFingerprint = browserIdInput.value;
            let endpoint;
            let requestData;
            
            if (chatMode === 'fmcsa') {
                endpoint = '/fmcsabot';
                
                if (fileInput.files.length > 0) {
                    const formData = new FormData();
                    formData.append('session_id', sessionIdForRequest);
                    formData.append('query', command);
                    formData.append('file', fileInput.files[0]);
                    formData.append('lang', selectedLanguage); // Add language parameter
                    
                    try {
                        console.log(`Sending to ${endpoint} with image and language ${selectedLanguage}:`, formData);
                        
                        statusDiv.textContent = getMessage('processing_image');
                        
                        const response = await fetch(`${API_URL}${endpoint}`, {
                            method: 'POST',
                            body: formData
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
                        
                        if (data.session_id && (!sessionIdForRequest || data.session_id !== sessionIdForRequest)) {
                            fmcsaSessionId = data.session_id;
                            localStorage.setItem(`heavyhaul_fmcsa_session_${browserID}`, fmcsaSessionId);
                            console.log(`FMCSA Session ID updated:`, fmcsaSessionId);
                            sessionIdInput.value = fmcsaSessionId;
                        }
                        
                        fileInput.value = '';
                        imagePreview.style.display = 'none';
                        
                        addMessage(data.response, false, data.message_id, elements);
                        
                        await playAudioResponse(data, command);
                        
                    } catch (error) {
                        console.error('Error processing FMCSA with image:', error);
                        addMessage(`Sorry, I encountered an error: ${error.message || error}`, false, null, elements);
                        statusDiv.textContent = `Error: ${error.message || error}. Ready...`;
                        statusDiv.classList.remove('heavyhaul-pulse');
                        processingCommand = false;
                        
                        if (isListening) {
                            setTimeout(() => safeStartRecognition(), 300);
                        }
                    }
                    
                    return;
                } else {
                    requestData = { 
                        query: command,
                        session_id: sessionIdForRequest,
                        lang: selectedLanguage // Add language parameter
                    };
                }
            } else if (chatMode === 'order') {
                endpoint = '/chat';
                requestData = { 
                    message: command,
                    session_id: sessionIdForRequest,
                    order_id: orderIdVal,
                    browser_fingerprint: browserFingerprint,
                    lang: selectedLanguage // Add language parameter
                };
            } else { // chatMode === 'state'
                endpoint = '/chatstate';
                requestData = { 
                    message: command,
                    session_id: sessionIdForRequest,
                    lang: selectedLanguage // Add language parameter
                };
            }

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
                
                if (data.session_id && (!sessionIdForRequest || data.session_id !== sessionIdForRequest)) {
                    if (chatMode === 'order') {
                        orderSessionId = data.session_id;
                        localStorage.setItem(`heavyhaul_session_${orderIdVal}_${browserID}`, orderSessionId);
                        console.log(`Order Session ID updated:`, orderSessionId);
                        sessionIdInput.value = orderSessionId;
                    } else if (chatMode === 'state') {
                        stateSessionId = data.session_id;
                        localStorage.setItem(`heavyhaul_state_session_${browserID}`, stateSessionId);
                        console.log(`State Session ID updated:`, stateSessionId);
                        sessionIdInput.value = stateSessionId;
                    } else if (chatMode === 'fmcsa') {
                        fmcsaSessionId = data.session_id;
                        localStorage.setItem(`heavyhaul_fmcsa_session_${browserID}`, fmcsaSessionId);
                        console.log(`FMCSA Session ID updated:`, fmcsaSessionId);
                        sessionIdInput.value = fmcsaSessionId;
                    }
                }

                addMessage(data.response, false, data.message_id, elements);

                await playAudioResponse(data, command);
                
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
                    statusDiv.textContent = getMessage('ready');
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
        
        async function playAudioResponse(data, originalCommand) {
            if (!audioContext) {
                console.log("No audio context available, skipping audio generation");
                statusDiv.textContent = getMessage('ready');
                statusDiv.classList.remove('heavyhaul-pulse');
                processingCommand = false;
                
                if (isListening) {
                    setTimeout(() => safeStartRecognition(), 300);
                }
                return;
            }
            
            let audioEndpoint = null;
            
            if (data.audio_endpoint) {
                audioEndpoint = data.audio_endpoint;
                console.log("Using audio endpoint from response:", audioEndpoint);
            } else {
                const chatMode = chatModeInput.value || 'order';
                if (chatMode === 'state' || chatMode === 'fmcsa') {
                    audioEndpoint = '/api/tts';
                    console.log("Using default TTS endpoint for", chatMode, "mode");
                } else {
                    console.log("No audio endpoint available and not in state/fmcsa mode, skipping audio");
                    statusDiv.textContent = getMessage('ready');
                    statusDiv.classList.remove('heavyhaul-pulse');
                    processingCommand = false;
                    
                    if (isListening) {
                        setTimeout(() => safeStartRecognition(), 300);
                    }
                    return;
                }
            }
            
            try {
                statusDiv.textContent = getMessage('generating_audio');
                
                const audioResponse = await fetch(`${API_URL}${audioEndpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                    text: data.response,
                    lang: data.lang // Pass the language code here
                })
                });
                
                if (!audioResponse.ok) {
                    try {
                        const error = await audioResponse.json();
                        throw new Error(error.error || `Audio API ${audioResponse.status}`);
                    } catch (err) {
                        throw new Error(`Audio API ${audioResponse.status}`);
                    }
                }
                
                statusDiv.textContent = getMessage('decoding_audio');
                const arrayBuffer = await audioResponse.arrayBuffer();
                
                if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                    throw new Error('Empty audio buffer');
                }
                
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                
                if (!audioBuffer) {
                    throw new Error('Audio decoding failed');
                }
                
                console.log('Audio decoded, preparing to play...');
                await stopAudioPlayback();

                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);

                currentAudioSource = source;
                isAudioPlaying = true;

                statusDiv.textContent = getMessage('playing_audio');
                statusDiv.classList.remove('heavyhaul-pulse');

                if (isListening && recognition) {
                    console.log("Attempting to start recognition during playback...");
                    try { 
                        recognition.start(); 
                    } catch(e) { 
                        console.warn("Rec start during playback failed:", e.name);
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
                                statusDiv.textContent = getMessage('ready');
                            }
                        } else {
                            console.log("Audio was stopped manually. Restart handled by recognition.onend.");
                            if(isListening) {
                                statusDiv.textContent = getMessage('listening');
                            } else {
                                statusDiv.textContent = 'Audio stopped.';
                            }
                        }
                    } else {
                        console.log("onended fired for an old/stopped audio source. Ignoring.");
                    }
                };

                source.start(0);
                
            } catch (error) {
                console.log("Audio generation/playback failed:", error.message);
                statusDiv.textContent = getMessage('ready');
                statusDiv.classList.remove('heavyhaul-pulse');
                processingCommand = false;
                
                if (isListening) {
                    setTimeout(() => safeStartRecognition(), 300);
                }
            }
        }

        function updateListenButtonState() {
            speakBtn.classList.toggle('listening', isListening);
            waveAnimation.style.display = isListening ? 'inline-flex' : 'none';
            const micIconSpan = `<span class="heavyhaul-mic-icon">${MIC_ICON}</span>`;
            speakBtn.innerHTML = isListening ? 
                `${micIconSpan} ${getMessage('stop_listening')}` : 
                `${micIconSpan} ${getMessage('start_listening')}`;
            if(isListening) speakBtn.appendChild(waveAnimation);
        }

        async function resetRecognitionEngine() {
            console.log("Completely resetting recognition engine");
            if (recognition) {
                try {
                    recognition.abort();
                } catch (e) {
                    console.warn("Error during recognition abort in reset:", e);
                }
                recognition = null;
                window.heavyhaulRecognition = null;
            }
            
            await new Promise(resolve => setTimeout(resolve, 200));
            
            recognition = new SpeechRecognition();
            recognition.lang = getSpeechLanguage(); // Use current language
            recognition.continuous = true;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            
            window.heavyhaulRecognition = recognition;
            
            // Reattach all event handlers (same as in initSpeechRecognition)
            recognition.onresult = (event) => {
                let originalTranscript = event.results[0][0].transcript.trim();
                console.log('Original recognized speech (reset engine):', originalTranscript);

                let transcript = applyWordReplacements(originalTranscript);
                 if (transcript !== originalTranscript) {
                    console.log('Replaced speech (reset engine):', transcript);
                }

                const transcriptLower = transcript.toLowerCase();

                const stopWords = ['stop', 'pare', 'стоп', 'oprește'];
                const containsStop = stopWords.some(word => transcriptLower.includes(word));

                if (containsStop) {
                    const now = Date.now();
                    if (now - lastStopCommand < 1000) {
                        console.log("Debouncing too rapid stop command");
                        return;
                    }
                    lastStopCommand = now;
                    
                    if (isAudioPlaying) {
                        console.log("STOP command detected during playback!");
                        stopAudioPlayback();
                        statusDiv.textContent = getMessage('audio_stopped');
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
                        addMessage("STOP", true, null, elements);
                        addMessage(getMessage('no_audio_playing'), false, null, elements);
                        
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
                statusDiv.textContent = getMessage('processing');
                statusDiv.classList.add('heavyhaul-pulse');
                addMessage(transcript, true, null, elements);
                processCommand(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error, event.message);
                let errorMsg = `Mic Error: ${event.error}.`;
                if (event.error === 'no-speech' && isListening) {
                    errorMsg = getMessage('no_speech_detected');
                } else if (event.error === 'not-allowed') {
                    errorMsg = getMessage('mic_access_denied');
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
                        statusDiv.textContent = getMessage('stopped_listening');
                    }
                }
            };
            
            return true;
        }
        
        setInterval(async () => {
            if (!isListening || isAudioPlaying || processingCommand) return;
            await resetRecognitionEngine();
            if (isListening) {
                setTimeout(() => safeStartRecognition(), 300);
            }
        }, 60000);

        if (initSpeechRecognition()) {
            speakBtn.addEventListener('click', async (event) => {
                event.preventDefault();
                const chatMode = chatModeInput.value || 'order';
                if (chatMode === 'order' && !CURRENT_ORDER_ID) {
                    statusDiv.textContent = 'Cannot start: No Order ID for order assistance.';
                    return;
                }
                
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

                isListening = !isListening;

                if (isListening) {
                    processingCommand = false; 
                    safeStartRecognition(); 
                }
                else {
                    statusDiv.textContent = getMessage('stopped_listening');
                    if (recognition) {
                        try {
                            recognition.abort();
                            console.log("Recognition aborted by button click.");
                        } catch (err) {
                            console.error('Error aborting recognition:', err);
                            try {
                                recognition.stop();
                            } catch (e) {
                                console.error("Fallback recognition.stop() also failed:", e);
                            }
                        }
                    }
                    await stopAudioPlayback(); 
                    processingCommand = false; 
                }

                updateListenButtonState(); 
            });
        } else {
            speakBtn.disabled = true;
            speakBtn.title = getMessage('speech_not_supported');
        }

        // Add initial greeting based on chat mode
        const initialChatMode = chatModeInput.value || 'order';
        if (initialChatMode === 'order') {
            addMessage(getMessage('hello_order'), false, null, elements);
        } else if (initialChatMode === 'state') {
            addMessage(getMessage('hello_state'), false, null, elements);
        } else if (initialChatMode === 'fmcsa') {
            addMessage(getMessage('hello_fmcsa'), false, null, elements);
        }

    } 

    // Initialize widget
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWidget);
    else initWidget();

    })();
