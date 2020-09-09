// Asynchronous Call
fetch("template.html")
    .then(stream => stream.text())
    .then(text => createElement(text));


function createElement(html) {
   // Script externo
    const script = document.createElement('script');
    script.setAttribute('src', 'script.js');

    // CSS externo
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', 'style.css');

    // Define o Web Component
    class C1  extends HTMLElement  {
        constructor() {
            super();
            console.log('Ciclo de Vida: constructor'); // Chamado somente uma vez
    
            // Cria o Shadow Root
            const shadow = this.attachShadow({mode: 'open'});

            // Conteúdo do componenete
            shadow.innerHTML = html;
            shadow.appendChild(style);
            shadow.appendChild(script);
        }
    
        // Atributo customizado
        get attr1() {
            return this.getAttribute('attr1');
        }

        set attr1(value) {
            this.setAttribute('attr1', value)
        }

        // Métodos de Cliclo de Vida
        connectedCallback() {
            console.log('Ciclo de Vida: connected'); // Chamado somente uma vez
        } 
        
        attributeChangedCallback(name, oldVal, newVal) {
            console.log('Ciclo de Vida: attributeChanged'); // Pode ser chamado vparias vezes
        }
    
        adoptedCallback() {
            console.log('Ciclo de Vida: adopted'); // Pode ser chamado vparias vezes
        }
    
        disconnectedCallback() {
            console.log('Ciclo de Vida: disconnected'); // Chamado somente uma vez
        }
    }

    // Registra o Web Component `C1` no objeto global window
    window.customElements.define('app-c1', C1);
}