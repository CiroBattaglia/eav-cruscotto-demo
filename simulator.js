import {_,Q,$m,Am,zm,Ym} from "../assets/runtime.js";
import {ah,oh} from "./utils.js";
var _h = {
  id: ``,
  name: `Nuovo scenario`,
  line: `LIN_003`,
  assets: 10,
  frequency: 12,
  maintenanceMinutes: 60,
  accessoryMinutes: 15,
  workers: 2,
  parCost: 24,
  external: 0,
  kwh: 0,
  tariff: 0.25,
  notes: ``,
  status: `Bozza`,
  created: ``,
};
function vh() {
  let [e, t] = (0, _.useState)(_h),
    [n, r] = (0, _.useState)(() =>
      JSON.parse(localStorage.getItem(`eav-demo-scenarios-v4`) || `[]`),
    ),
    [i, a] = (0, _.useState)(``),
    o = [
      e.name.trim() ? `` : `Inserisci il nome dello scenario`,
      e.assets <= 0 ? `Il numero di asset deve essere maggiore di zero` : ``,
      e.frequency <= 0 ? `La frequenza deve essere maggiore di zero` : ``,
      e.maintenanceMinutes <= 0
        ? `Il tempo di manutenzione deve essere maggiore di zero`
        : ``,
      e.accessoryMinutes < 0
        ? `Il tempo accessorio non può essere negativo`
        : ``,
      e.workers <= 0 ? `Il numero di addetti deve essere maggiore di zero` : ``,
      e.parCost < 0 || e.external < 0 || e.kwh < 0 || e.tariff < 0
        ? `Costi e consumi non possono essere negativi`
        : ``,
      e.status !== `Bozza` && !e.notes.trim()
        ? `Le note sono obbligatorie per validare o rendere definitivo lo scenario`
        : ``,
    ].filter(Boolean),
    s = o.length === 0,
    c = s
      ? ((e.maintenanceMinutes + e.accessoryMinutes) *
          e.assets *
          e.frequency *
          e.workers) /
        60
      : 0,
    l = c / 1550,
    u = c * e.parCost,
    d = e.kwh * e.tariff,
    f = u + e.external + d,
    p = (n, r) => t({ ...e, [n]: r }),
    m = () => {
      if (!s) {
        a(o[0]);
        return;
      }
      let i = {
          ...e,
          id:
            e.id ||
            `DEMO_${new Date().getFullYear()}_${String(n.length + 1).padStart(4, `0`)}`,
          created: e.created || new Date().toLocaleDateString(`it-IT`),
        },
        c = [i, ...n.filter((e) => e.id !== i.id)];
      (r(c),
        localStorage.setItem(`eav-demo-scenarios-v4`, JSON.stringify(c)),
        t(i),
        a(`Scenario demo salvato correttamente`));
    },
    h = (t, n = 0, r = 1) =>
      (0, Q.jsx)(`input`, {
        type: `number`,
        min: n,
        step: r,
        value: e[t] ?? ``,
        onInput: (e) => {
          let n = e.currentTarget.value;
          p(t, n === `` ? `` : Number(n));
        },
      });
  return (0, Q.jsxs)(`div`, {
    className: `sim-layout`,
    children: [
      (0, Q.jsxs)(`div`, {
        children: [
          (0, Q.jsxs)(`div`, {
            className: `page-heading`,
            children: [
              (0, Q.jsxs)(`div`, {
                children: [
                  (0, Q.jsx)(`p`, { children: `Decision support` }),
                  (0, Q.jsx)(`h2`, { children: `Simulatore manutentivo` }),
                  (0, Q.jsx)(`span`, {
                    children: `Valori modificabili e confrontabili con lo standard`,
                  }),
                ],
              }),
              (0, Q.jsxs)(`button`, {
                className: `primary`,
                disabled: !s,
                onClick: m,
                children: [(0, Q.jsx)(zm, { size: 17 }), ` Salva scenario`],
              }),
            ],
          }),
          i &&
            (0, Q.jsx)(`div`, {
              className: `feedback ok`,
              role: `status`,
              children: i,
            }),
          !s &&
            (0, Q.jsxs)(`div`, {
              className: `validation`,
              children: [
                (0, Q.jsx)(Ym, {}),
                (0, Q.jsxs)(`div`, {
                  children: [
                    (0, Q.jsx)(`b`, { children: `Completa lo scenario` }),
                    o.map((e) => (0, Q.jsx)(`span`, { children: e }, e)),
                  ],
                }),
              ],
            }),
          (0, Q.jsxs)(`section`, {
            className: `form-card`,
            children: [
              (0, Q.jsxs)(`div`, {
                className: `form-grid`,
                children: [
                  (0, Q.jsxs)(`label`, {
                    children: [
                      `Nome scenario`,
                      (0, Q.jsx)(`input`, {
                        value: e.name,
                        onChange: (e) => p(`name`, e.target.value),
                      }),
                    ],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [
                      `Linea`,
                      (0, Q.jsx)(`select`, {
                        value: e.line,
                        onChange: (e) => p(`line`, e.target.value),
                        children: $m.map((e) =>
                          (0, Q.jsxs)(
                            `option`,
                            { value: e[0], children: [e[0], ` · `, e[1]] },
                            e[0],
                          ),
                        ),
                      }),
                    ],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [
                      `Numero asset`,
                      h(`assets`, 1),
                      (0, Q.jsx)(`small`, { children: `Standard modificato` }),
                    ],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [`Frequenza annua`, h(`frequency`, 1)],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [
                      `Minuti manutenzione`,
                      h(`maintenanceMinutes`, 1),
                    ],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [`Minuti accessori`, h(`accessoryMinutes`, 0)],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [`Numero addetti`, h(`workers`, 1)],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [
                      `Costo medio PAR €/h`,
                      h(`parCost`, 0, 0.01),
                      (0, Q.jsx)(`small`, { children: `Valore dimostrativo` }),
                    ],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [`Costo esterno €`, h(`external`, 0, 0.01)],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [`Consumo annuo kWh`, h(`kwh`, 0, 0.01)],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [`Tariffa €/kWh`, h(`tariff`, 0, 0.01)],
                  }),
                  (0, Q.jsxs)(`label`, {
                    children: [
                      `Stato`,
                      (0, Q.jsxs)(`select`, {
                        value: e.status,
                        onChange: (e) => p(`status`, e.target.value),
                        children: [
                          (0, Q.jsx)(`option`, { children: `Bozza` }),
                          (0, Q.jsx)(`option`, { children: `Validato` }),
                          (0, Q.jsx)(`option`, { children: `Definitivo` }),
                          (0, Q.jsx)(`option`, { children: `Archiviato` }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, Q.jsxs)(`label`, {
                children: [
                  `Motivazione e note`,
                  (0, Q.jsx)(`textarea`, {
                    value: e.notes,
                    onChange: (e) => p(`notes`, e.target.value),
                    placeholder: `Motiva le variazioni rispetto allo standard…`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, Q.jsxs)(`aside`, {
        className: `result ${s ? `` : `invalid`}`,
        children: [
          (0, Q.jsx)(`p`, { children: `RISULTATO SCENARIO` }),
          (0, Q.jsx)(`h3`, { children: e.name || `Scenario senza nome` }),
          (0, Q.jsxs)(`div`, {
            children: [
              (0, Q.jsx)(`small`, { children: `Costo totale annuo` }),
              (0, Q.jsx)(`strong`, { children: s ? ah(f) : `—` }),
            ],
          }),
          (0, Q.jsxs)(`dl`, {
            children: [
              (0, Q.jsx)(`dt`, { children: `Ore-uomo` }),
              (0, Q.jsx)(`dd`, { children: s ? `${oh(c)} h` : `—` }),
              (0, Q.jsx)(`dt`, { children: `FTE richiesti` }),
              (0, Q.jsx)(`dd`, { children: s ? oh(l) : `—` }),
              (0, Q.jsx)(`dt`, { children: `Costo interno` }),
              (0, Q.jsx)(`dd`, { children: s ? ah(u) : `—` }),
              (0, Q.jsx)(`dt`, { children: `Costo esterno` }),
              (0, Q.jsx)(`dd`, { children: s ? ah(e.external) : `—` }),
              (0, Q.jsx)(`dt`, { children: `Energia` }),
              (0, Q.jsx)(`dd`, { children: s ? ah(d) : `—` }),
            ],
          }),
          (0, Q.jsxs)(`div`, {
            className: `formula`,
            children: [
              `(`,
              e.maintenanceMinutes,
              ` + `,
              e.accessoryMinutes,
              `) × `,
              e.assets,
              ` asset × `,
              e.frequency,
              ` cicli × `,
              e.workers,
              ` addetti ÷ 60`,
            ],
          }),
          (0, Q.jsxs)(`button`, {
            className: `ghost full`,
            onClick: () => window.print(),
            children: [(0, Q.jsx)(Am, { size: 17 }), ` Esporta scheda`],
          }),
          n.length > 0 &&
            (0, Q.jsxs)(`div`, {
              className: `saved`,
              children: [
                (0, Q.jsx)(`b`, { children: `Scenari salvati` }),
                n
                  .slice(0, 3)
                  .map((e) =>
                    (0, Q.jsxs)(
                      `button`,
                      {
                        onClick: () => t(e),
                        children: [
                          (0, Q.jsx)(`span`, { children: e.id }),
                          e.name,
                        ],
                      },
                      e.id,
                    ),
                  ),
              ],
            }),
        ],
      }),
    ],
  });
}

export default vh;
