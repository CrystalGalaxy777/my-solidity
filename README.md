Отличная идея 🙌 README – это первое, что увидит твой учитель на GitHub. Давай я дам тебе готовый чистый вариант для копипаста. Он будет простым, но профессионально выглядящим.

---

## 📌 README.md

````markdown
# 🏦 SimpleBank (Solidity + Truffle)

Ein Lernprojekt für Smart Contracts in Solidity.  
Ziel: Eine **kleine Bank**, bei der man ETH einzahlen, abheben und das Guthaben abfragen kann.  

---

## 🚀 Funktionen

- **Einzahlen (`deposit`)**: ETH senden und Guthaben erhöhen  
- **Abheben (`withdraw`)**: ETH abheben, nur wenn genug Guthaben vorhanden  
- **Kontostand (`balanceOf`)**: Aktuelles Guthaben eines Users anzeigen  
- **Events**: Jeder Ein- und Auszahlung wird protokolliert  

---

## 🧪 Tests

Die Funktionen wurden mit **Truffle/Mocha** getestet:  

- ✅ Einzahlen erhöht Guthaben  
- ✅ Abheben reduziert Guthaben  
- ✅ Null-Einzahlung wird abgelehnt  
- ✅ Über-Abhebung wird abgelehnt  
- ✅ Events für Ein- und Auszahlung  

Alle Tests laufen erfolgreich auf der lokalen Blockchain (**Ganache**).  

---

## ⚙️ Installation & Nutzung

```bash
# Abhängigkeiten installieren
npm install

# Lokale Blockchain starten
npm run ganache

# Smart Contracts kompilieren
npm run compile

# Deploy auf lokaler Blockchain
npm run migrate:dev

# Tests ausführen
npm run test:dev

# Interaktive Konsole starten
npm run console:dev
````

---

## 🔄 CI/CD

Das Projekt nutzt **GitHub Actions**, um automatisch bei jedem Push:

1. Ganache zu starten
2. Contracts zu deployen
3. Alle Tests laufen zu lassen

---

## 📚 Technologien

* Solidity `^0.8.24`
* Truffle `^5.11.5`
* Ganache CLI
* OpenZeppelin Test Helpers

---

✍️ Entwickelt als Lernprojekt von **CrystalGalaxy777**

```