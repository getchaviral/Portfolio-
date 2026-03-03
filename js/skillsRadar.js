// Skills Radar Chart using D3.js
class SkillsRadar {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = d3.select(`#${containerId}`);
        if (this.container.empty()) {
            console.warn(`SkillsRadar: container "#${containerId}" not found`);
            return;
        }
        this.width = 500;
        this.height = 500;
        this.margin = 80;
        this.radius = Math.min(this.width, this.height) / 2 - this.margin;
        this.levels = 5;
        this.baseTransform = `translate(${this.width / 2}, ${this.height / 2})`;
        this.svg = null;
        this.tooltip = null;
        this.glowId = `glow-${containerId}`;
        this.targetRotation = 0;
        this.currentRotation = 0;
        this.rotationFrame = null;
        
        this.skills = [
            { skill: "JavaScript / React", value: 85, color: "#f7df1e", description: "Building interactive UIs, reusable components, and scalable frontend architecture" },
            { skill: "Python", value: 80, color: "#3776ab", description: "Backend logic, automation, and problem solving with clean code practices" },
            { skill: "Node.js / Express", value: 70, color: "#68a063", description: "REST API development, middleware design, and server-side workflows" },
            { skill: "HTML / CSS / Tailwind", value: 90, color: "#38bdf8", description: "Responsive UI implementation with utility-first and modern styling patterns" },
            { skill: "DSA", value: 75, color: "#ff6b6b", description: "Strong foundation in problem solving, optimization, and coding interview patterns" },
            { skill: "System Design", value: 65, color: "#8b5cf6", description: "Basic to intermediate understanding of scalable architectures and API-first design" },
            { skill: "Git / GitHub", value: 82, color: "#f97316", description: "Version control workflows, branching strategies, and collaborative development" },
            { skill: "MongoDB / Databases", value: 72, color: "#4db33d", description: "Schema modeling, query optimization, and reliable persistence layers" },
            { skill: "AI/ML Integration", value: 68, color: "#ffb703", description: "Integrating AI features into products for practical, real-world user value" }
        ];
        
        this.angleSlice = Math.PI * 2 / this.skills.length;
        this.rScale = d3.scaleLinear().domain([0, 100]).range([0, this.radius]);
        
        this.init();
    }
    
    init() {
        this.createSVG();
        this.createTooltip();
        this.drawGrid();
        this.drawAxes();
        this.drawSkillArea();
        this.drawSkillPoints();
        this.drawLabels();
        this.addInteractions();
    }
    
    createSVG() {
        // Clear existing content
        this.container.selectAll("*").remove();
        
        this.svg = this.container
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("transform", this.baseTransform);
    }
    
    createTooltip() {
        this.tooltip = this.container
            .append("div")
            .style("position", "absolute")
            .style("background", "rgba(0, 0, 0, 0.9)")
            .style("color", "#fff")
            .style("padding", "10px")
            .style("border-radius", "5px")
            .style("border", "1px solid #00d4ff")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("z-index", 1000);
    }
    
    drawGrid() {
        // Draw concentric circles
        for (let level = 1; level <= this.levels; level++) {
            const levelRadius = this.radius * level / this.levels;
            
            this.svg.append("circle")
                .attr("r", levelRadius)
                .attr("fill", "none")
                .attr("stroke", "rgba(0, 212, 255, 0.2)")
                .attr("stroke-width", 1)
                .style("filter", "drop-shadow(0 0 2px rgba(0, 212, 255, 0.3))");
            
            // Add level labels
            if (level < this.levels) {
                this.svg.append("text")
                    .attr("x", 4)
                    .attr("y", -levelRadius + 4)
                    .attr("fill", "rgba(0, 212, 255, 0.6)")
                    .attr("font-size", "10px")
                    .text(`${(level * 20)}%`);
            }
        }
    }
    
    drawAxes() {
        this.skills.forEach((skill, i) => {
            const angle = i * this.angleSlice - Math.PI / 2;
            const x2 = this.radius * Math.cos(angle);
            const y2 = this.radius * Math.sin(angle);
            
            // Draw axis line
            this.svg.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", x2)
                .attr("y2", y2)
                .attr("stroke", "rgba(0, 212, 255, 0.3)")
                .attr("stroke-width", 1);
        });
    }
    
    drawSkillArea() {
        // Create the radar area
        const line = d3.line()
            .x((d, i) => {
                const angle = i * this.angleSlice - Math.PI / 2;
                return this.rScale(d.value) * Math.cos(angle);
            })
            .y((d, i) => {
                const angle = i * this.angleSlice - Math.PI / 2;
                return this.rScale(d.value) * Math.sin(angle);
            })
            .curve(d3.curveLinearClosed);
        
        // Add glow filter
        const defs = this.svg.append("defs");
        const filter = defs.append("filter")
            .attr("id", this.glowId);
        
        filter.append("feGaussianBlur")
            .attr("stdDeviation", "3")
            .attr("result", "coloredBlur");
        
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");
        
        // Draw the main area
        this.skillPath = this.svg.append("path")
            .datum(this.skills)
            .attr("d", line)
            .attr("fill", "rgba(0, 212, 255, 0.1)")
            .attr("stroke", "#00d4ff")
            .attr("stroke-width", 2)
            .style("filter", `url(#${this.glowId})`);
        
        // Animate the drawing
        const totalLength = this.skillPath.node().getTotalLength();
        this.skillPath
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    }
    
    drawSkillPoints() {
        this.skills.forEach((skill, i) => {
            const angle = i * this.angleSlice - Math.PI / 2;
            const x = this.rScale(skill.value) * Math.cos(angle);
            const y = this.rScale(skill.value) * Math.sin(angle);
            
            // Create point group
            const pointGroup = this.svg.append("g")
                .attr("class", "skill-point")
                .attr("transform", `translate(${x}, ${y})`);
            
            // Outer glow circle
            pointGroup.append("circle")
                .attr("r", 8)
                .attr("fill", skill.color)
                .attr("opacity", 0.3)
                .attr("class", "glow-circle");
            
            // Main point
            const mainPoint = pointGroup.append("circle")
                .attr("r", 5)
                .attr("fill", skill.color)
                .attr("stroke", "#ffffff")
                .attr("stroke-width", 2)
                .attr("class", "main-point")
                .style("cursor", "pointer");
            
            // Add pulse animation
            pointGroup.select(".glow-circle")
                .transition()
                .duration(2000)
                .delay(i * 200)
                .ease(d3.easeElastic)
                .attr("r", 12)
                .attr("opacity", 0.1);
            
            mainPoint
                .transition()
                .duration(1000)
                .delay(i * 100)
                .ease(d3.easeBounce)
                .attr("r", 5);
            
            // Store data for interactions
            pointGroup.datum(skill);
        });
    }
    
    drawLabels() {
        this.skills.forEach((skill, i) => {
            const angle = i * this.angleSlice - Math.PI / 2;
            const labelRadius = this.radius + 25;
            const x = labelRadius * Math.cos(angle);
            const y = labelRadius * Math.sin(angle);
            
            const label = this.svg.append("text")
                .attr("x", x)
                .attr("y", y)
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .attr("fill", "#00d4ff")
                .attr("font-size", "14px")
                .attr("font-weight", "600")
                .style("cursor", "pointer")
                .text(skill.skill);
            
            // Add background for better readability
            const bbox = label.node().getBBox();
            this.svg.insert("rect", "text")
                .attr("x", bbox.x - 4)
                .attr("y", bbox.y - 2)
                .attr("width", bbox.width + 8)
                .attr("height", bbox.height + 4)
                .attr("fill", "rgba(0, 0, 0, 0.7)")
                .attr("rx", 3);
            
            // Animate labels
            label
                .style("opacity", 0)
                .transition()
                .duration(800)
                .delay(i * 150)
                .style("opacity", 1);
        });
    }
    
    addInteractions() {
        // Add hover effects to skill points
        this.svg.selectAll(".skill-point")
            .on("mouseover", (event, d) => {
                // Highlight point
                d3.select(event.currentTarget)
                    .select(".main-point")
                    .transition()
                    .duration(200)
                    .attr("r", 8);
                
                d3.select(event.currentTarget)
                    .select(".glow-circle")
                    .transition()
                    .duration(200)
                    .attr("r", 15)
                    .attr("opacity", 0.4);
                
                // Show tooltip
                this.tooltip
                    .style("opacity", 1)
                    .html(`
                        <div style="font-weight: bold; color: ${d.color};">${d.skill}</div>
                        <div style="margin: 5px 0;">Proficiency: ${d.value}%</div>
                        <div style="font-size: 11px; color: #ccc;">${d.description}</div>
                    `)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mouseout", (event, d) => {
                // Reset point
                d3.select(event.currentTarget)
                    .select(".main-point")
                    .transition()
                    .duration(200)
                    .attr("r", 5);
                
                d3.select(event.currentTarget)
                    .select(".glow-circle")
                    .transition()
                    .duration(200)
                    .attr("r", 12)
                    .attr("opacity", 0.1);
                
                // Hide tooltip
                this.tooltip.style("opacity", 0);
            })
            .on("click", (event, d) => {
                this.showSkillDetail(d);
            });
        
        // Add smooth, bounded rotation on mouse move
        const svgEl = this.container.select("svg").node();
        this.svg.on("mousemove", (event) => {
            if (!svgEl) return;
            const [x] = d3.pointer(event, svgEl);
            const normalizedX = (x - this.width / 2) / (this.width / 2);
            const clampedX = Math.max(-1, Math.min(1, normalizedX));
            const maxTilt = 8;
            this.targetRotation = clampedX * maxTilt;
            this.startRotationLoop();
        })
        .on("mouseleave", () => {
            this.targetRotation = 0;
            this.startRotationLoop();
        });
    }

    startRotationLoop() {
        if (this.rotationFrame) return;

        const tick = () => {
            const delta = this.targetRotation - this.currentRotation;
            this.currentRotation += delta * 0.12;
            this.svg.attr("transform", `${this.baseTransform} rotate(${this.currentRotation})`);

            if (Math.abs(delta) < 0.05) {
                this.currentRotation = this.targetRotation;
                this.svg.attr("transform", `${this.baseTransform} rotate(${this.currentRotation})`);
                this.rotationFrame = null;
                return;
            }

            this.rotationFrame = requestAnimationFrame(tick);
        };

        this.rotationFrame = requestAnimationFrame(tick);
    }
    
    showSkillDetail(skill) {
        const skillDetails = {
            "JavaScript / React": {
                experience: "Advanced",
                projects: ["bloodbond-platform", "smart-reservation-system", "muggam"],
                frameworks: ["React", "JavaScript (ES6+)", "Component-driven architecture"]
            },
            "Python": {
                experience: "Advanced",
                projects: ["AI workflow prototypes", "automation utilities", "backend logic modules"],
                frameworks: ["Flask", "Python scripting", "API integrations"]
            },
            "Node.js / Express": {
                experience: "Intermediate to Advanced",
                projects: ["smart-reservation-system", "bloodbond backend services"],
                frameworks: ["Node.js", "Express.js", "REST APIs"]
            },
            "HTML / CSS / Tailwind": {
                experience: "Advanced",
                projects: ["portfolio interfaces", "muggam UI", "responsive landing pages"],
                frameworks: ["HTML5", "CSS3", "Tailwind CSS"]
            },
            "DSA": {
                experience: "Intermediate to Strong",
                projects: ["coding challenges", "optimized backend routines"],
                frameworks: ["Arrays/Strings", "Graphs/Trees", "Complexity optimization"]
            },
            "System Design": {
                experience: "Basic to Intermediate",
                projects: ["reservation system architecture", "modular service planning"],
                frameworks: ["API design", "caching concepts", "scalability fundamentals"]
            },
            "Git / GitHub": {
                experience: "Advanced",
                projects: ["team collaboration workflows", "feature-branch development"],
                frameworks: ["Git", "GitHub", "PR-based reviews"]
            },
            "MongoDB / Databases": {
                experience: "Intermediate",
                projects: ["smart-reservation-system", "bloodbond data models"],
                frameworks: ["MongoDB", "Mongoose", "CRUD optimization"]
            },
            "AI/ML Integration": {
                experience: "Intermediate",
                projects: ["muggam concept workflows", "AI-enabled matching logic"],
                frameworks: ["ML API integration", "prompt workflow design", "feature-level AI adoption"]
            }
        };
        
        const details = skillDetails[skill.skill] || { experience: "Learning", projects: [], frameworks: [] };
        const projectsText = details.projects.length ? `- ${details.projects.join('\n- ')}` : '- None yet';
        const frameworksText = details.frameworks.length ? `- ${details.frameworks.join('\n- ')}` : '- None yet';

        alert(
            `${skill.skill} Details:\n\n` +
            `Experience: ${details.experience}\n` +
            `Proficiency: ${skill.value}%\n\n` +
            `Key Projects:\n${projectsText}\n\n` +
            `Technologies:\n${frameworksText}\n\n` +
            `${skill.description}`
        );
    }
    
    updateSkill(skillName, newValue) {
        const skillIndex = this.skills.findIndex(s => s.skill === skillName);
        if (skillIndex !== -1) {
            this.skills[skillIndex].value = newValue;
            this.redraw();
        }
    }
    
    redraw() {
        // Remove existing elements
        this.svg.selectAll(".skill-point").remove();
        this.svg.selectAll("defs").remove();
        if (this.skillPath) {
            this.skillPath.remove();
        }
        
        // Redraw
        this.drawSkillArea();
        this.drawSkillPoints();
        this.addInteractions();
    }
    
    destroy() {
        if (this.rotationFrame) {
            cancelAnimationFrame(this.rotationFrame);
            this.rotationFrame = null;
        }
        if (this.container) {
            this.container.selectAll("*").remove();
        }
    }
}

// Export for use in main.js
window.SkillsRadar = SkillsRadar;
