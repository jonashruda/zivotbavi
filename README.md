# Život Baví — moderní web (stake-like)
Tento balíček obsahuje nový moderní vzhled webu **zivotbavi.cz** s podporou **dark/light** režimu, skleněných karet, plynulých animací a „stake.com“ vibe.

## Struktura
- `/index.html` — Domů (hero, služby, reference, CTA)
- `/sluzby.html` — Nabídka služeb + ceník
- `/o-nas.html` — Mise, milníky, tým
- `/blog.html` — Přehled článků
- `/clanek.html` — Šablona článku
- `/kontakt.html` — Formulář a kontakty
- `/404.html` — Chybová stránka
- `/assets/css/brand.css` — **Upravte barvy**, aby odpovídaly současné identitě (ponechal jsem stake‑like akcenty jako výchozí)
- `/assets/css/styles.css` — jádro stylů a animací
- `/assets/js/main.js` — přepínač tématu, animace, slider, validace formuláře
- `/assets/img/*` — logo + placeholdery

## Barvy / brand
V souboru **assets/css/brand.css** nastavte proměnné tak, aby odpovídaly stávajícím barvám webu. Například:
```css
:root{
  --brand-1:#HEX1;
  --brand-2:#HEX2;
  --brand-3:#HEX3;
}
```
Všechny prvky (tlačítka, gradienty, orby) se automaticky přebarví.

## Nasazení
Toto je čisté HTML/CSS/JS bez buildu. Stačí nahrát obsah složky na hosting (nebo do kořene WordPressu jako statické šablony stránek). Odkazy jsou relativní z kořene (`/`).

## Formulář
Výchozí chování kontakt formuláře otevře e‑mail (mailto). Pokud chcete skutečné odesílání, změňte JS v `main.js` na volání vašeho backendu (např. `/api/mail`).

## SEO a výkon
- Přidán `meta description`
- Lazy iFrame, malé SVG ikony, žádné těžké knihovny
- Přístupnost: popisky, aria‑labely, focus stavy

## Úpravy
- Navigace: doplňte reálné odkazy sociálních sítí
- Obsah: nahraďte placeholder texty a fotky
- Mapu upravte na vaši adresu (Google Maps embed URL)
