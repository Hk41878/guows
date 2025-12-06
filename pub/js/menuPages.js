/* ============================================================
   PAGE 0 — HOME PAGE TEMPLATE (FULL HOME SCREEN)
============================================================ */
export const page0HTML = `
<div id="page0" class="homePage">

    <header class="topbar">
        <div class="topbar-inner">

            <div class="logo-wrap">
                <img src="assets/img/logo.png" class="nav-logo" alt="">
            </div>

            <div class="nav-text">
                <h1 class="nav-tagline">Eat • Drink • Have Fun</h1>
            </div>

            <nav class="main-nav">
                <button class="nav-link">Menu</button>
                <button class="nav-link">Contact</button>
                <button class="nav-link">English</button>
            </nav>

        </div>
    </header>

    <div class="home-bg"></div>

    <footer class="footer">
        <div class="footer-icons">

            <button class="f-item">
                <img src="assets/svg/email.svg" class="f-icon-img">
                <span class="f-label">Email</span>
            </button>

            <button class="f-item">
                <img src="assets/svg/facebook.svg" class="f-icon-img">
                <span class="f-label">Facebook</span>
            </button>

            <button class="f-item">
                <img src="assets/svg/call.svg" class="f-icon-img">
                <span class="f-label">Call</span>
            </button>

            <button class="f-item">
                <img src="assets/svg/instagram.svg" class="f-icon-img">
                <span class="f-label">Instagram</span>
            </button>

            <button class="f-item">
                <img src="assets/svg/map.svg" class="f-icon-img">
                <span class="f-label">Map</span>
            </button>

        </div>
    </footer>

</div>
`;



/* ============================================================
   PAGE 1 — MENU PAGE 1 (ONLY FLOATING BUTTONS)
============================================================ */
export const page1HTML = `
<div class="menuPage">

    <div class="floating-menu-btns">
        <button class="home-btn">Home</button>
        <button class="nav-link">Contact</button>
        <button class="nav-link">English</button>
    </div>

    <h1 class="menu-title">HARRY'S PUB</h1>

    <div class="img-top-right img-slot"></div>

    <h2 class="section-title">APERITIVO</h2>

    <div class="menu-item">
        <span class="item-name">BRUSCHETTE</span>
        <span class="item-price">5,00€</span>
    </div>
    <p class="item-desc">pomodoro e basilico / crema di olive / burrata e alici</p>

    <div class="menu-item">
        <span class="item-name">MINI TRAMEZZINI</span>
        <span class="item-price">5,00€</span>
    </div>
    <p class="item-desc">tonno e olive / prosciutto cotto e formaggio</p>

    <div class="menu-item">
        <span class="item-name">CAPRESE</span>
        <span class="item-price">5,00€</span>
    </div>
    <p class="item-desc">pomodoro, mozzarella, olio, origano, sale</p>

    <h2 class="section-title">FRITTI</h2>

    <div class="img-middle img-slot"></div>

    <div class="menu-item"><span class="item-name">FRITTI MISTI</span><span class="item-price">9,00€</span></div>
    <div class="menu-item"><span class="item-name">PATATINE FRITTI STICK</span><span class="item-price">4,00€</span></div>
    <div class="menu-item"><span class="item-name">PATATINE FRITTE DIPPERS</span><span class="item-price">5,00€</span></div>
    <div class="menu-item"><span class="item-name">ANELLI DI CIPOLLA</span><span class="item-price">5,00€</span></div>

    <div class="menu-item">
        <span class="item-name">CHICKEN WINGS</span>
        <span class="item-price">7,00€</span>
    </div>
    <p class="item-desc">ali di pollo croccanti</p>

    <div class="menu-item">
        <span class="item-name">CHICKEN TENDERS / STRIPS</span>
        <span class="item-price">7,00€</span>
    </div>
    <p class="item-desc">filetti di pollo teneri e croccanti, impanati e fritti dorati</p>

    <div class="menu-item">
        <span class="item-name">NUGGETS DI POLLO</span>
        <span class="item-price">5,00€</span>
    </div>

    <div class="img-bottom-right img-slot"></div>

</div>
`;



/* ============================================================
   PAGE 2 — MENU PAGE 2 (ONLY FLOATING BUTTONS)
============================================================ */
export const page2HTML = `
<div class="menuPage">

    <div class="floating-menu-btns">
        <button class="home-btn">Home</button>
        <button class="nav-link">Contact</button>
        <button class="nav-link">English</button>
    </div>

    <h1 class="menu-title">HARRY'S PUB</h1>

    <div class="img-top-right img-slot"></div>

    <h2 class="section-title">PUCCE</h2>

    <div class="menu-item">
        <span class="item-name">SALENTINA</span>
        <span class="item-price">7,00€</span>
    </div>
    <p class="item-desc">prosciutto crudo, mozzarella fior di latte, pomodoro, rucola</p>

    <div class="menu-item">
        <span class="item-name">SMOKY CHICKEN</span>
        <span class="item-price">9,00€</span>
    </div>
    <p class="item-desc">straccetti di pollo fritto, iceberg, salsa ranch</p>

    <div class="menu-item">
        <span class="item-name">SPICY BBQ</span>
        <span class="item-price">9,00€</span>
    </div>
    <p class="item-desc">bocconcini di pollo BBQ, cipolla croccante, cheddar</p>

    <div class="menu-item">
        <span class="item-name">CHEDDAR</span>
        <span class="item-price">9,00€</span>
    </div>
    <p class="item-desc">hamburger scottona, cheddar, insalata, mayo</p>

    <div class="menu-item">
        <span class="item-name">BLACK LIST</span>
        <span class="item-price">12,00€</span>
    </div>
    <p class="item-desc">hamburger scottona, pulled pork, BBQ, pomodorini secchi</p>

    <div class="menu-item">
        <span class="item-name">HARRY'S SPECIAL</span>
        <span class="item-price">12,00€</span>
    </div>
    <p class="item-desc">hamburger scottona, bacon, emmental, cipolla caramellata</p>

</div>
`;
/* ============================================================
   PAGE 3 — BURGER MENU (ONLY FLOATING BUTTONS)
============================================================ */
export const page3HTML = `
<div class="menuPage">

    <div class="floating-menu-btns">
        <button class="home-btn">Home</button>
        <button class="nav-link">Contact</button>
        <button class="nav-link">English</button>
    </div>

    <div class="img-top-left img-slot"></div>

    <h1 class="menu-title">HARRY'S PUB</h1>

    <h2 class="section-title">BURGER</h2>

    <div class="menu-item">
        <span class="item-name">CRUNCHY KICK</span>
        <span class="item-price">6,00€</span>
    </div>
    <p class="item-desc">pollo fritto super croccante, cheddar, lattuga, pomodoro, salsa speziata</p>

    <div class="menu-item">
        <span class="item-name">DOUBLE CRUNCH</span>
        <span class="item-price">9,00€</span>
    </div>
    <p class="item-desc">doppio filetto crispy, cheddar, cipolla croccante, mayo, pomodoro</p>

    <div class="menu-item">
        <span class="item-name">GOLDEN CHICKEN</span>
        <span class="item-price">9,00€</span>
    </div>
    <p class="item-desc">cotoletta di pollo panato, pomodori, insalata, maionese</p>

    <div class="menu-item">
        <span class="item-name">PROCEDIMENTO</span>
        <span class="item-price">9,00€</span>
    </div>
    <p class="item-desc">hamburger di scottona, cheddar, pomodoro, insalata verde, maionese</p>

    <div class="menu-item">
        <span class="item-name">STRALCIO</span>
        <span class="item-price">14,00€</span>
    </div>
    <p class="item-desc">doppio hamburger di scottona, doppio cheddar, pomodoro, insalata verde, maionese</p>

    <div class="img-bottom-center img-slot"></div>

</div>
`;
/* ============================================================
   PAGE 4 — PINSE + CARNE MENU (ONLY FLOATING BUTTONS)
============================================================ */
export const page4HTML = `
<div class="menuPage">

    <div class="floating-menu-btns">
        <button class="home-btn">Home</button>
        <button class="nav-link">Contact</button>
        <button class="nav-link">English</button>
    </div>

    <div class="img-top-right img-slot"></div>

    <h1 class="menu-title">HARRY'S PUB</h1>

    <h2 class="section-title">PINSE</h2>

    <div class="menu-item">
        <span class="item-name">MARGHERITA</span>
        <span class="item-price">6,00€</span>
    </div>
    <p class="item-desc">pomodoro, mozzarella</p>

    <div class="menu-item">
        <span class="item-name">DIAVOLA</span>
        <span class="item-price">9,00€</span>
    </div>
    <p class="item-desc">pomodoro, scamorza, salame piccante</p>

    <div class="menu-item">
        <span class="item-name">ARTICOLO</span>
        <span class="item-price">10,00€</span>
    </div>
    <p class="item-desc">
        mozzarella fiordilatte, capocollo di Martina Franca, stracciatella
    </p>

    <div class="menu-item">
        <span class="item-name">ASSOLUZIONE</span>
        <span class="item-price">10,00€</span>
    </div>
    <p class="item-desc">salmone, stracciatella, rucola</p>

    <div class="menu-item">
        <span class="item-name">PECCATORE</span>
        <span class="item-price">9,00€</span>
    </div>
    <p class="item-desc">
        pomodoro, mozzarella di latte, ventrìcina, gorgonzola
    </p>

    <div class="menu-item">
        <span class="item-name">PARCELLA</span>
        <span class="item-price">9,00€</span>
    </div>
    <p class="item-desc">
        pomodoro, mozzarella, würstel, patatine
    </p>

    <div class="menu-item">
        <span class="item-name">PORKO</span>
        <span class="item-price">10,00€</span>
    </div>
    <p class="item-desc">
        pulled pork, datterino giallo, cipolla caramellata, cheddar
    </p>

    <h2 class="section-title">CARNE NEL PIATTO</h2>

    <div class="menu-item">
        <span class="item-name">CONDANNA X1 PERSONA</span>
        <span class="item-price">15,00€</span>
    </div>
    <p class="item-desc">
        fettina di scottona, petto di pollo, hamburger di scottona da 100gr,
        bombetta dolce, salsiccia
    </p>

    <div class="menu-item">
        <span class="item-name">CONDANNA X2 PERSONE</span>
        <span class="item-price">27,00€</span>
    </div>
    <p class="item-desc">
        2 fettine di scottona, 2 petti di pollo, 2 hamburger di scottona da 100gr,
        2 bombette dolci, 2 salsicce dolci, 2 fettine di capocollo
    </p>

    <div class="menu-item">
        <span class="item-name">SAN VITTORE</span>
        <span class="item-price">11,00€</span>
    </div>
    <p class="item-desc">
        hamburger da 200gr, capocollo, bacon croccante, insalata verde, uovo
    </p>

    <div class="menu-item">
        <span class="item-name">REBIBBIA</span>
        <span class="item-price">9,00€</span>
    </div>
    <p class="item-desc">tagliata di pollo, rucola, pomodorini</p>

    <div class="img-bottom-right img-slot"></div>

</div>
`;


/* ============================================================
   PAGE 5 — BEER MENU (EXACTLY AS YOU SENT)
============================================================ */
export const page5HTML = `
<div class="page">

    <div class="img-top-right img-slot"></div>

    <h1 class="menu-title">HARRY’S PUB</h1>

    <h2 class="section-title">BIRRE</h2>
    <h3 class="sub-title">ALLA SPINA</h3>

    <div class="beer-block">
        <div class="beer-left">
            <div class="beer-name">ICHNUSA NON FILTRATA</div>
            <div class="beer-desc">
                bionda non filtrata, bassa fermentazione, colore dorato, presenta profumi erbacei e note di frutta gialla e albicocca
            </div>
        </div>
        <div class="beer-right">
            <div class="grad">GRADAZIONE: 5.0%</div>
            <div class="sizes">0.2LT €3,00<br>0.4LT €5,00</div>
        </div>
    </div>

    <div class="beer-block">
        <div class="beer-left">
            <div class="beer-name">MORETTI BLONDA</div>
            <div class="beer-desc">
                bionda, bassa fermentazione, dal sapore maltato con finale, leggermente amarognolo
            </div>
        </div>
        <div class="beer-right">
            <div class="grad">GRADAZIONE: 4.6%</div>
            <div class="sizes">0.2LT €2,50<br>0.4LT €4,50</div>
        </div>
    </div>

    <div class="beer-block">
        <div class="beer-left">
            <div class="beer-name">MORETTI ROSSA</div>
            <div class="beer-desc">
                rossa, bassa fermentazione, note di caramello e liquirizia
            </div>
        </div>
        <div class="beer-right">
            <div class="grad">GRADAZIONE: 7.2%</div>
            <div class="sizes">0.2LT €3,00<br>0.4LT €5,00</div>
        </div>
    </div>

    <div class="img-middle img-slot"></div>

    <h2 class="section-title">BIRRE</h2>
    <h3 class="sub-title">IN BOTTIGLIA</h3>

    <div class="bottle-grid">

        <div class="col">
            <div class="beer-name">PARANOIA (0.33LT)</div>
            <div class="beer-desc">giallo pallido, non filtrata... note di frutta tropicale...</div>
            <div class="beer-price">5,00€</div>

            <div class="beer-name">DAB EXPORT (0.33LT)</div>
            <div class="beer-desc">bionda limpida, aromi puliti...</div>
            <div class="beer-price">2,50€</div>

            <div class="beer-name">DAB HOPPY LAGER (0.33LT)</div>
            <div class="beer-desc">gusto intenso, note agrumate...</div>
            <div class="beer-price">3,00€</div>

            <div class="beer-name">HEINEKEN (0.33LT)</div>
            <div class="beer-desc">lager, gusto fine...</div>
            <div class="beer-price">2,50€</div>

            <div class="beer-name">CERES (0.33LT)</div>
            <div class="beer-desc">aroma vinoso e fruttato...</div>
            <div class="beer-price">3,50€</div>
        </div>

        <div class="col">
            <div class="beer-name">DAURA (0.33LT)</div>
            <div class="beer-desc">sapore morbido, bilanciato...</div>
            <div class="beer-price">3,50€</div>

            <div class="beer-name">AVERBODE (0.33LT)</div>
            <div class="beer-desc">birra d’abbazia luppolata...</div>
            <div class="beer-price">5,00€</div>

            <div class="beer-name">DAB KELLER (0.50LT)</div>
            <div class="beer-desc">bionda non filtrata, cruda...</div>
            <div class="beer-price">5,00€</div>

            <div class="beer-name">TENNENT’S (0.33LT)</div>
            <div class="beer-desc">colore giallo rosato...</div>
            <div class="beer-price">3,50€</div>
        </div>

    </div>

</div>
`;