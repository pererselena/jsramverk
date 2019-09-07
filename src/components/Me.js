import React, {
    Component
} from 'react';
import profileImg from '../img/me.jpg';



class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    componentDidMount() {
        let that = this;

        that.setState({
            message:
                <main>
                    <article>

                        <h2>Min me-sida i kursen jsramverk</h2>

                        <p><img className="me" src={profileImg} width="500" alt="Bild på mig" /></p>

                        <p>Mitt namn är Elena Perers. Född och uppvuxen i Barnaul, en stad som ligger Sydvästra Sibirien i Ryssland. Där växte jag upp, gick i skolan och universitetet.</p>

                        <p>Jag läste sociologi och juridik på Altai State University i Barnaul, Ryssland.</p>

                        <p>Mitt första möte med programmering fick jag i högstadiet då vi fick lära oss basic. Det kändes för komplicerat för mig på den tiden och bestämde mig för att inte bli utvecklare. Men nu sitter jag här och studerar webbprogramering. Intresset väcktes för inte så länge sedan när jag flyttade till Sverige bestämde jag mig för att byta yrke helt. Jag började bli nyfiken på hur fungerar webbsidor och började titta på video kurser om HTML, CSS och JS och blev förvånad att det är inte så komplicerat och det är inte omöjligt att lära sig.</p>
                        <p>Vill du läsa mer om vad jag jobbat med så kan du kika på min <a href="https://www.linkedin.com/in/elena-perers/">Linkedin-profil</a>.</p>

                        <p>/Elena Perers</p>

                    </article>
                </main>
        });

    }

    render() {
        return (
            this.state.message
        );
    }
}

export default Me;
