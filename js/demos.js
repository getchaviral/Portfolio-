// Live Code Demo Functions
class DemoSystem {
    constructor() {
        this.isRunning = false;
        this.demoOutputs = new Map();
    }
    
    // Gallery Animation Demo
    runGalleryDemo() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        // Create demo modal
        const modal = this.createDemoModal('Gallery Animation Demo');
        const content = modal.querySelector('.demo-content');
        
        // Create demo gallery
        content.innerHTML = `
            <div class="demo-gallery" style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin: 1rem 0;
            ">
                ${Array.from({length: 6}, (_, i) => `
                    <div class="gallery-item" style="
                        width: 100%;
                        height: 120px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: bold;
                        transform: scale(0.8);
                        opacity: 0.7;
                        transition: all 0.3s ease;
                        cursor: pointer;
                        animation: slideUp 0.6s ease forwards;
                        animation-delay: ${i * 0.1}s;
                    ">
                        Item ${i + 1}
                    </div>
                `).join('')}
            </div>
            <div class="demo-code" style="
                background: rgba(0, 0, 0, 0.8);
                padding: 1rem;
                border-radius: 5px;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                margin-top: 1rem;
                border: 1px solid #00d4ff;
            ">
                <div style="color: #4ecdc4;">// Gallery hover effects</div>
                <div style="color: #ff6b6b;">const items = document.querySelectorAll('.gallery-item');</div>
                <div style="color: #00d4ff;">items.forEach((item, index) => {</div>
                <div style="color: #fff; margin-left: 20px;">item.style.animationDelay = \`\${index * 0.1}s\`;</div>
                <div style="color: #fff; margin-left: 20px;">item.addEventListener('mouseenter', () => {</div>
                <div style="color: #fff; margin-left: 40px;">item.style.transform = 'scale(1.05) rotateY(5deg)';</div>
                <div style="color: #fff; margin-left: 20px;">});</div>
                <div style="color: #00d4ff;">});</div>
            </div>
        `;
        
        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from {
                    transform: translateY(50px) scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add hover effects
        setTimeout(() => {
            const items = content.querySelectorAll('.gallery-item');
            items.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'scale(1.05) rotateY(5deg)';
                    item.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.3)';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'scale(1) rotateY(0deg)';
                    item.style.boxShadow = 'none';
                });
            });
            this.isRunning = false;
        }, 1000);
        
        this.addDemoResult(modal, '✨ Gallery animation demo running! Hover over items to see effects.');
    }
    
    // Task Manager Demo
    runTaskDemo() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        const modal = this.createDemoModal('Task Manager Real-time Demo');
        const content = modal.querySelector('.demo-content');
        
        content.innerHTML = `
            <div class="task-board" style="
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin: 1rem 0;
            ">
                <div class="task-column" style="
                    background: rgba(255, 255, 255, 0.1);
                    padding: 1rem;
                    border-radius: 10px;
                    border: 1px solid rgba(0, 212, 255, 0.3);
                ">
                    <h4 style="color: #ff6b6b; margin-bottom: 0.5rem;">To Do</h4>
                    <div class="task-list" id="todo-list"></div>
                </div>
                <div class="task-column" style="
                    background: rgba(255, 255, 255, 0.1);
                    padding: 1rem;
                    border-radius: 10px;
                    border: 1px solid rgba(78, 205, 196, 0.3);
                ">
                    <h4 style="color: #4ecdc4; margin-bottom: 0.5rem;">In Progress</h4>
                    <div class="task-list" id="progress-list"></div>
                </div>
                <div class="task-column" style="
                    background: rgba(255, 255, 255, 0.1);
                    padding: 1rem;
                    border-radius: 10px;
                    border: 1px solid rgba(0, 212, 255, 0.3);
                ">
                    <h4 style="color: #00d4ff; margin-bottom: 0.5rem;">Done</h4>
                    <div class="task-list" id="done-list"></div>
                </div>
            </div>
            <div class="demo-console" style="
                background: rgba(0, 0, 0, 0.9);
                padding: 1rem;
                border-radius: 5px;
                font-family: 'Courier New', monospace;
                font-size: 0.8rem;
                margin-top: 1rem;
                border: 1px solid #00d4ff;
                max-height: 150px;
                overflow-y: auto;
            " id="task-console"></div>
        `;
        
        const tasks = [
            { id: 1, title: 'Design UI mockups', status: 'todo' },
            { id: 2, title: 'Implement authentication', status: 'progress' },
            { id: 3, title: 'Set up database', status: 'done' }
        ];
        
        const console = content.querySelector('#task-console');
        const addLog = (message, type = 'info') => {
            const colors = { info: '#00d4ff', success: '#4ecdc4', warning: '#ffbd2e', error: '#ff6b6b' };
            console.innerHTML += `<div style="color: ${colors[type]};">[${new Date().toLocaleTimeString()}] ${message}</div>`;
            console.scrollTop = console.scrollHeight;
        };
        
        const renderTask = (task) => `
            <div class="task-item" style="
                background: rgba(255, 255, 255, 0.1);
                padding: 0.5rem;
                margin-bottom: 0.5rem;
                border-radius: 5px;
                border-left: 3px solid #00d4ff;
                cursor: pointer;
                transition: all 0.3s ease;
            " data-task-id="${task.id}">
                ${task.title}
            </div>
        `;
        
        // Initial render
        tasks.forEach(task => {
            const list = content.querySelector(`#${task.status === 'progress' ? 'progress' : task.status}-list`);
            list.innerHTML += renderTask(task);
        });

        const listIdByStatus = (status) => `#${status === 'progress' ? 'progress' : status}-list`;

        const moveTask = (taskId) => {
            const task = tasks.find(t => t.id === taskId);
            if (!task) return;

            if (task.status === 'todo') task.status = 'progress';
            else if (task.status === 'progress') task.status = 'done';
            else return;

            ['todo', 'progress', 'done'].forEach(status => {
                const list = content.querySelector(listIdByStatus(status));
                if (list) list.innerHTML = '';
            });

            tasks.forEach(item => {
                const list = content.querySelector(listIdByStatus(item.status));
                if (list) list.innerHTML += renderTask(item);
            });

            addLog(`Task moved by click: "${task.title}" -> ${task.status}`, 'info');
        };

        content.querySelector('.task-board').addEventListener('click', (event) => {
            const taskItem = event.target.closest('.task-item');
            if (!taskItem) return;

            const taskId = Number(taskItem.dataset.taskId);
            if (!Number.isNaN(taskId)) {
                moveTask(taskId);
            }
        });
        
        addLog('🚀 Task Manager initialized');
        addLog('📡 WebSocket connection established');
        addLog('👥 3 team members online');
        
        // Simulate real-time updates
        let updateCount = 0;
        const simulateUpdates = () => {
            const updates = [
                () => {
                    addLog('📝 New task created: "Write documentation"', 'success');
                    const todoList = content.querySelector('#todo-list');
                    todoList.innerHTML += renderTask({ id: 4, title: 'Write documentation' });
                },
                () => {
                    addLog('🔄 Task moved: "Design UI mockups" → In Progress', 'warning');
                    const task = content.querySelector('#todo-list .task-item');
                    if (task) {
                        task.remove();
                        content.querySelector('#progress-list').innerHTML += renderTask({ id: 1, title: 'Design UI mockups' });
                    }
                },
                () => {
                    addLog('✅ Task completed: "Implement authentication"', 'success');
                    const task = content.querySelector('#progress-list .task-item');
                    if (task) {
                        task.remove();
                        content.querySelector('#done-list').innerHTML += renderTask({ id: 2, title: 'Implement authentication' });
                    }
                },
                () => addLog('👤 User "Sarah" joined the project', 'info'),
                () => addLog('💬 New comment on "Set up database"', 'info'),
                () => addLog('⚡ Real-time sync completed', 'success')
            ];
            
            if (updateCount < updates.length) {
                updates[updateCount]();
                updateCount++;
                setTimeout(simulateUpdates, 2000);
            } else {
                this.isRunning = false;
            }
        };
        
        setTimeout(simulateUpdates, 1000);
        this.addDemoResult(modal, '🔄 Real-time task updates simulation running...');
    }
    
    // AI Code Assistant Demo
    runAIDemo() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        const modal = this.createDemoModal('AI Code Assistant Demo');
        const content = modal.querySelector('.demo-content');
        
        content.innerHTML = `
            <div class="ai-interface" style="
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin: 1rem 0;
            ">
                <div class="code-input" style="
                    background: rgba(0, 0, 0, 0.8);
                    padding: 1rem;
                    border-radius: 10px;
                    border: 1px solid rgba(255, 107, 107, 0.3);
                ">
                    <h4 style="color: #ff6b6b; margin-bottom: 0.5rem;">📝 Your Code</h4>
                    <div style="
                        font-family: 'Courier New', monospace;
                        font-size: 0.9rem;
                        line-height: 1.4;
                    ">
                        <div style="color: #4ecdc4;">function</div>
                        <div style="color: #fff;">calculateTotal(items) {</div>
                        <div style="color: #ff6b6b; margin-left: 20px;">let total = 0;</div>
                        <div style="color: #ff6b6b; margin-left: 20px;">for(let i = 0; i < items.length; i++) {</div>
                        <div style="color: #ff6b6b; margin-left: 40px;">total = total + items[i].price;</div>
                        <div style="color: #ff6b6b; margin-left: 20px;">}</div>
                        <div style="color: #ff6b6b; margin-left: 20px;">return total;</div>
                        <div style="color: #fff;">}</div>
                    </div>
                </div>
                <div class="ai-suggestions" style="
                    background: rgba(0, 0, 0, 0.8);
                    padding: 1rem;
                    border-radius: 10px;
                    border: 1px solid rgba(0, 212, 255, 0.3);
                ">
                    <h4 style="color: #00d4ff; margin-bottom: 0.5rem;">🤖 AI Suggestions</h4>
                    <div id="ai-output" style="
                        font-family: 'Courier New', monospace;
                        font-size: 0.8rem;
                        line-height: 1.4;
                    "></div>
                </div>
            </div>
            <div class="ai-metrics" style="
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin: 1rem 0;
            ">
                <div class="metric" style="
                    background: rgba(78, 205, 196, 0.1);
                    padding: 1rem;
                    border-radius: 10px;
                    border: 1px solid rgba(78, 205, 196, 0.3);
                    text-align: center;
                ">
                    <div style="font-size: 2rem; color: #4ecdc4;" id="confidence">0%</div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">Confidence</div>
                </div>
                <div class="metric" style="
                    background: rgba(255, 107, 107, 0.1);
                    padding: 1rem;
                    border-radius: 10px;
                    border: 1px solid rgba(255, 107, 107, 0.3);
                    text-align: center;
                ">
                    <div style="font-size: 2rem; color: #ff6b6b;" id="issues">0</div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">Issues Found</div>
                </div>
                <div class="metric" style="
                    background: rgba(0, 212, 255, 0.1);
                    padding: 1rem;
                    border-radius: 10px;
                    border: 1px solid rgba(0, 212, 255, 0.3);
                    text-align: center;
                ">
                    <div style="font-size: 2rem; color: #00d4ff;" id="performance">0%</div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">Performance</div>
                </div>
            </div>
            <div class="analysis-log" style="
                background: rgba(0, 0, 0, 0.9);
                padding: 1rem;
                border-radius: 5px;
                font-family: 'Courier New', monospace;
                font-size: 0.8rem;
                margin-top: 1rem;
                border: 1px solid #4ecdc4;
                max-height: 120px;
                overflow-y: auto;
            " id="analysis-log"></div>
        `;
        
        const aiOutput = content.querySelector('#ai-output');
        const analysisLog = content.querySelector('#analysis-log');
        const confidenceEl = content.querySelector('#confidence');
        const issuesEl = content.querySelector('#issues');
        const performanceEl = content.querySelector('#performance');
        
        const addLog = (message, type = 'info') => {
            const colors = { info: '#4ecdc4', warning: '#ffbd2e', error: '#ff6b6b', success: '#00d4ff' };
            analysisLog.innerHTML += `<div style="color: ${colors[type]};">[${new Date().toLocaleTimeString()}] ${message}</div>`;
            analysisLog.scrollTop = analysisLog.scrollHeight;
        };
        
        const animateCounter = (element, target, suffix = '') => {
            let current = 0;
            const increment = target / 20;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.round(current) + suffix;
            }, 100);
        };
        
        // Simulate AI analysis
        const analysisSteps = [
            () => {
                addLog('🧠 Initializing neural network...', 'info');
                aiOutput.innerHTML = '<div style="color: #4ecdc4;">🔍 Analyzing code patterns...</div>';
            },
            () => {
                addLog('📊 Tokenizing code structure...', 'info');
                animateCounter(confidenceEl, 25, '%');
            },
            () => {
                addLog('⚡ Running performance analysis...', 'warning');
                aiOutput.innerHTML += '<div style="color: #ffbd2e;">⚠️ Inefficient loop detected</div>';
                animateCounter(issuesEl, 2);
                animateCounter(confidenceEl, 65, '%');
            },
            () => {
                addLog('💡 Generating optimization suggestions...', 'success');
                aiOutput.innerHTML += `
                    <div style="color: #00d4ff; margin-top: 0.5rem;">💡 Suggestion:</div>
                    <div style="color: #fff; margin-left: 10px;">Use reduce() for better performance:</div>
                    <div style="color: #4ecdc4; margin-left: 10px; font-size: 0.8rem;">
                        return items.reduce((sum, item) => sum + item.price, 0);
                    </div>
                `;
                animateCounter(performanceEl, 85, '%');
                animateCounter(confidenceEl, 92, '%');
            },
            () => {
                addLog('✅ Analysis complete - High confidence optimization found', 'success');
                aiOutput.innerHTML += `
                    <div style="color: #4ecdc4; margin-top: 0.5rem;">🎯 Benefits:</div>
                    <div style="color: #fff; margin-left: 10px;">• 40% faster execution</div>
                    <div style="color: #fff; margin-left: 10px;">• More readable code</div>
                    <div style="color: #fff; margin-left: 10px;">• Functional programming style</div>
                `;
                animateCounter(performanceEl, 140, '%');
            },
            () => {
                addLog('🚀 Optimization ready for implementation', 'success');
                this.isRunning = false;
            }
        ];
        
        let stepIndex = 0;
        const runNextStep = () => {
            if (stepIndex < analysisSteps.length) {
                analysisSteps[stepIndex]();
                stepIndex++;
                setTimeout(runNextStep, 1500);
            }
        };
        
        setTimeout(runNextStep, 500);
        this.addDemoResult(modal, '🤖 AI analysis in progress... Neural networks processing your code patterns!');
    }
    
    // Create demo modal
    createDemoModal(title) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 20px;
            padding: 2rem;
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        `;
        
        content.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2 style="color: #00d4ff; margin: 0;">${title}</h2>
                <button class="demo-close-btn" style="
                    background: #ff6b6b;
                    border: none;
                    color: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
            </div>
            <div class="demo-content"></div>
            <div class="demo-result" style="
                margin-top: 1rem;
                padding: 1rem;
                background: rgba(0, 212, 255, 0.1);
                border-radius: 10px;
                border: 1px solid rgba(0, 212, 255, 0.3);
                color: #00d4ff;
                font-size: 0.9rem;
            "></div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);

        const closeBtn = content.querySelector('.demo-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.remove();
                this.isRunning = false;
            });
        }
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        return modal;
    }
    
    addDemoResult(modal, message) {
        const resultDiv = modal.querySelector('.demo-result');
        resultDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div class="pulse-dot" style="
                    width: 8px;
                    height: 8px;
                    background: #4ecdc4;
                    border-radius: 50%;
                    animation: pulse 1.5s infinite;
                "></div>
                ${message}
            </div>
        `;
        
        // Add pulse animation
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(pulseStyle);
    }
}

// Create global demo system instance
const demoSystem = new DemoSystem();

// Global functions for button clicks
function runGalleryDemo() {
    demoSystem.runGalleryDemo();
}

function runTaskDemo() {
    demoSystem.runTaskDemo();
}

function runAIDemo() {
    demoSystem.runAIDemo();
}

// Export for use in other files
window.DemoSystem = demoSystem;
