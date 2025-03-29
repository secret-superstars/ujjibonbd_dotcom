const BACKEND_API_KEY = "YOUR_API_KEY_HERE";

const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const attachButton = document.getElementById('attachButton');
const fileUploadArea = document.getElementById('fileUploadArea');
const cancelFileUpload = document.getElementById('cancelFileUpload');
const fileDropzone = document.getElementById('fileDropzone');
const fileInput = document.getElementById('fileInput');
const infoButton = document.getElementById('infoButton');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModalButton = document.getElementById('closeModalButton');
const toastContainer = document.getElementById('toastContainer');
const suggestionItems = document.querySelectorAll('.suggestion-item');

let messages = [];
let isLoading = false;

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  messageInput.addEventListener('input', handleInputChange);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
  
  sendButton.addEventListener('click', handleSendMessage);
  
  attachButton.addEventListener('click', toggleFileUpload);
  cancelFileUpload.addEventListener('click', toggleFileUpload);
  
  fileDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropzone.classList.add('dragover');
  });
  
  fileDropzone.addEventListener('dragleave', () => {
    fileDropzone.classList.remove('dragover');
  });
  
  fileDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropzone.classList.remove('dragover');
    
    if (e.dataTransfer.files.length) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  });
  
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleFileUpload(fileInput.files[0]);
    }
  });
  
  infoButton.addEventListener('click', () => {
    modalBackdrop.classList.remove('hidden');
  });
  
  closeModalButton.addEventListener('click', () => {
    modalBackdrop.classList.add('hidden');
  });
  
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.add('hidden');
    }
  });
  
  suggestionItems.forEach(item => {
    item.addEventListener('click', () => {
      messageInput.value = item.textContent.replace('• ', '');
      handleInputChange();
      messageInput.focus();
    });
  });
}

function handleInputChange() {
  sendButton.disabled = !messageInput.value.trim();
}

function handleSendMessage() {
  const content = messageInput.value.trim();
  
  if (!content || isLoading) return;
  
  const userMessage = {
    id: Date.now().toString(),
    role: 'user',
    content: content,
    timestamp: new Date()
  };
  
  addMessageToChat(userMessage);
  messages.push(userMessage);
  
  messageInput.value = '';
  sendButton.disabled = true;
  
  showLoadingIndicator();
  
  setTimeout(() => {
    const responseContent = "As South Asia's first Career AI, I'm here to help with your professional journey. I can assist with resume reviews, interview preparation, career path guidance, and industry insights specific to South Asian markets. How specifically can I help with your career today?";
    
    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date()
    };
    
    hideLoadingIndicator();
    addMessageToChat(assistantMessage);
    messages.push(assistantMessage);
    
    scrollToBottom();
  }, 1500);
}

function addMessageToChat(message) {
  const welcomeScreen = document.querySelector('.welcome-screen');
  if (welcomeScreen && messages.length === 0) {
    welcomeScreen.remove();
  }
  
  const messageElement = document.createElement('div');
  messageElement.className = `message ${message.role}`;
  
  const formattedTime = formatTime(message.timestamp);
  
  let avatarIcon = '';
  if (message.role === 'user') {
    avatarIcon = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `;
  } else {
    avatarIcon = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
  }
  
  let fileAttachmentHtml = '';
  if (message.fileAttachment) {
    fileAttachmentHtml = `
      <div class="file-attachment">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
        </svg>
        <span>${message.fileAttachment.name}</span>
      </div>
    `;
  }
  
  messageElement.innerHTML = `
    <div class="message-bubble">
      <div class="message-header">
        <div class="message-avatar">
          ${avatarIcon}
        </div>
        <div class="message-info">
          ${message.role === 'user' ? 'You' : 'Career AI'} • ${formattedTime}
        </div>
      </div>
      ${fileAttachmentHtml}
      <div class="message-content">${message.content}</div>
    </div>
  `;
  
  chatMessages.appendChild(messageElement);
  scrollToBottom();
}

function showLoadingIndicator() {
  isLoading = true;
  
  const loadingElement = document.createElement('div');
  loadingElement.className = 'loading-indicator';
  loadingElement.id = 'loadingIndicator';
  loadingElement.innerHTML = `
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
  `;
  
  chatMessages.appendChild(loadingElement);
  scrollToBottom();
}

function hideLoadingIndicator() {
  isLoading = false;
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}

function toggleFileUpload() {
  fileUploadArea.classList.toggle('hidden');
  fileInput.value = '';
}

function handleFileUpload(file) {
  toggleFileUpload();
  
  const fileMessage = {
    id: Date.now().toString(),
    role: 'user',
    content: `Attached file: ${file.name}`,
    timestamp: new Date(),
    fileAttachment: {
      name: file.name,
      type: file.type
    }
  };
  
  addMessageToChat(fileMessage);
  messages.push(fileMessage);
  
  showToast('File processed', "I'll analyze this document and provide career insights based on it.");
}

function showToast(title, description, duration = 4000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-header">${title}</div>
    <div class="toast-body">${description}</div>
  `;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}