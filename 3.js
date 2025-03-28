document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('cover-letter-form');
    const generateBtn = document.getElementById('generate-btn');
    const downloadPdfBtn = document.getElementById('download-pdf');
    const copyTextBtn = document.getElementById('copy-text');
    const editLetterBtn = document.getElementById('edit-letter');
    const letterPreview = document.getElementById('letter-preview');
    const letterContent = document.getElementById('letter-content');
    const dateInput = document.getElementById('date');
    
    // Set today's date as default
    const today = new Date();
    dateInput.value = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Event Listeners
    generateBtn.addEventListener('click', generateCoverLetter);
    downloadPdfBtn.addEventListener('click', downloadAsPdf);
    copyTextBtn.addEventListener('click', copyToClipboard);
    editLetterBtn.addEventListener('click', toggleEditMode);
    
    // Generate cover letter
    function generateCoverLetter() {
        const name = document.getElementById('applicant-name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company-name').value;
        const position = document.getElementById('position').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        const interest = document.getElementById('company-interest').value;
        const date = dateInput.value;
        
        // Validate form
        if (!name || !email || !company || !position || !experience || !skills || !interest) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Generate letter content
        const letterTemplate = `
${date}

Hiring Manager
${company}

Dear Hiring Manager,

I am excited to apply for the ${position} position at ${company}. With ${experience} of relevant experience, I am confident in my ability to contribute effectively to your team.

My key skills include ${skills}, which I believe align well with the requirements for this position. 

What excites me most about ${company} is ${interest}. I would welcome the opportunity to bring my expertise to your organization and help drive your mission forward.

I have attached my resume for your review and would appreciate the opportunity to discuss how my skills and experiences align with your needs. You can reach me at ${email}. Thank you for your time and consideration.

Sincerely,
${name}
        `;
        
        // Display generated letter
        letterContent.textContent = letterTemplate;
        letterPreview.classList.remove('hidden');
        letterPreview.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Download as PDF
    function downloadAsPdf() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFont('helvetica');
        doc.setFontSize(12);
        
        const content = letterContent.textContent;
        const lines = doc.splitTextToSize(content, 180);
        
        let y = 20;
        lines.forEach(line => {
            if (line.trim() !== '') {
                doc.text(line, 15, y);
                y += 7;
                
                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
            }
        });
        
        doc.save(`${document.getElementById('applicant-name').value}_Cover_Letter.pdf`);
    }
    
    // Copy to clipboard
    function copyToClipboard() {
        navigator.clipboard.writeText(letterContent.textContent)
            .then(() => {
                copyTextBtn.textContent = 'Copied!';
                copyTextBtn.style.backgroundColor = '#10b981';
                setTimeout(() => {
                    copyTextBtn.textContent = 'Copy Text';
                    copyTextBtn.style.backgroundColor = '';
                }, 2000);
            });
    }
    
    // Toggle edit mode
    function toggleEditMode() {
        letterPreview.classList.add('hidden');
        window.scrollTo(0, 0);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const dateFormat = document.getElementById('date-format');
    const customFormatGroup = document.getElementById('custom-format-group');
    const customFormat = document.getElementById('custom-format');
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    const interval = document.getElementById('interval');
    const count = document.getElementById('count');
    const generateBtn = document.getElementById('generate-btn');
    const output = document.getElementById('output');
    const copyBtn = document.getElementById('copy-btn');

    // Set default dates
    const today = new Date();
    startDate.valueAsDate = today;
    endDate.valueAsDate = new Date(today.setDate(today.getDate() + 30));

    // Show/hide custom format field
    dateFormat.addEventListener('change', function() {
        customFormatGroup.style.display = this.value === 'custom' ? 'block' : 'none';
    });

    // Generate dates
    generateBtn.addEventListener('click', function() {
        const format = dateFormat.value === 'custom' ? customFormat.value : dateFormat.value;
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);
        const step = parseInt(interval.value);
        const numDates = parseInt(count.value);
        
        let dates = [];
        let current = new Date(start);
        
        for (let i = 0; i < numDates && current <= end; i++) {
            dates.push(formatDate(current, format));
            current.setDate(current.getDate() + step);
        }
        
        output.textContent = dates.join('\n');
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(output.textContent)
            .then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = 'Copy to Clipboard', 2000);
            });
    });

    // Format date according to selected pattern
    function formatDate(date, format) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];

        switch(format) {
            case 'mm/dd/yyyy':
                return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
            case 'dd/mm/yyyy':
                return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
            case 'yyyy-mm-dd':
                return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            case 'month-day-year':
                return `${monthNames[date.getMonth()]} ${day}, ${year}`;
            case 'day-month-year':
                return `${day} ${monthNames[date.getMonth()]} ${year}`;
            default:
                // Handle custom format
                return format.replace('YYYY', year)
                           .replace('MM', month.toString().padStart(2, '0'))
                           .replace('DD', day.toString().padStart(2, '0'));
        }
    }
});