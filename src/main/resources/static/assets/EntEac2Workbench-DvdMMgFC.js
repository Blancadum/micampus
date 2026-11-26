import{r as u,j as e,L as W}from"./vendor-react-B1CazfeU.js";import{u as k}from"./index-Bqg8ppYj.js";import"./vendor-diagrams-CwglY0O5.js";const g=[{num:1,question:"Quina és la tasca d’un programador informàtic?",options:[{key:"a",text:"Escollir quines ordres formen el programa, en quin ordre s’executen i sobre quines dades s’apliquen",correct:!0},{key:"b",text:"Fabricar el maquinari on s’executarà el programa",correct:!1},{key:"c",text:"Només corregir errors del sistema operatiu",correct:!1},{key:"d",text:"Exclusivament dissenyar les interfícies gràfiques",correct:!1}],justification:"El programador tradueix els requeriments i algoritmes en instruccions precises que un ordinador pugui executar sobre dades concretes."},{num:2,question:"Què és el codi font?",options:[{key:"a",text:"El conjunt de fitxers de text que contenen les instruccions del programa escrites en un llenguatge de programació",correct:!0},{key:"b",text:"El fitxer binari que executa directament el processador",correct:!1},{key:"c",text:"El resultat de la tasca de l’enllaçador",correct:!1},{key:"d",text:"Una col·lecció de codi predefinit",correct:!1}],justification:"El codi font són fitxers de text pla editables per humans que després són compilats o interpretats."},{num:3,question:"Amb quin objectiu va sorgir el concepte de màquina virtual?",options:[{key:"a",text:"Augmentar la velocitat d’execució dels intèrprets",correct:!1},{key:"b",text:"Eliminar la necessitat d’escriure codi font",correct:!1},{key:"c",text:"Facilitar el desenvolupament de compiladors que generin codi per a diferents processadors",correct:!0},{key:"d",text:"Substituir el sistema operatiu",correct:!1}],justification:"La màquina virtual (com la JVM) ofereix una capa d'abstracció (bytecode) que permet executar el mateix programa en qualsevol arquitectura de processador."},{num:4,question:"Quin és un dels inconvenients dels llenguatges de baix nivell (primera i segona generació)?",options:[{key:"a",text:"No permeten optimitzar els programes",correct:!1},{key:"b",text:"Els programes estan lligats al maquinari i no es poden traslladar fàcilment a altres sistemes",correct:!0},{key:"c",text:"Són massa abstractes per al programador",correct:!1},{key:"d",text:"Només funcionen amb bases de dades",correct:!1}],justification:"Els llenguatges màquina i d'assemblador depenen estretament dels jocs d'instruccions i registres físics de la CPU concreta."},{num:5,question:"Quina d’aquestes és la classificació de paradigmes de programació?",options:[{key:"a",text:"Compilat, interpretat, virtual i natiu",correct:!1},{key:"b",text:"Baix nivell, mig nivell i alt nivell",correct:!1},{key:"c",text:"Seqüencial, concurrent, paral·lel i distribuït",correct:!1},{key:"d",text:"Imperatiu/estructurat, d’objectes, funcional i lògic",correct:!0}],justification:"Són els quatre grans enfocaments filosòfics i estructurals per modelar la computació."},{num:6,question:"Qui va desenvolupar la programació estructurada i què considera innecessari?",options:[{key:"a",text:"Alan Turing; l’ús de bucles",correct:!1},{key:"b",text:"Edsger W. Dijkstra; l’ús d’instruccions de transferència incondicional com GOTO",correct:!0},{key:"c",text:"Bjarne Stroustrup; l’ús de classes",correct:!1},{key:"d",text:"John McCarthy; l’ús de funcions",correct:!1}],justification:"Dijkstra va publicar el famós article 'Go To Statement Considered Harmful' (1968), promovent estructures de seqüència, selecció i iteració."},{num:7,question:"Què és un objecte en la programació orientada a objectes?",options:[{key:"a",text:"Un fitxer de codi font",correct:!1},{key:"b",text:"Una funció que retorna un únic valor",correct:!1},{key:"c",text:"Un tipus de dades bàsic",correct:!1},{key:"d",text:"Una combinació de dades (atributs) i mètodes que permeten interactuar-hi.",correct:!0}],justification:"Un objecte encapsula un estat intern (camps) i un comportament exposat (mètodes)."},{num:8,question:"Quins són els 5 conceptes en què es basa la programació orientada a objectes?",options:[{key:"a",text:"Seqüència, selecció, iteració, modularitat i herència",correct:!1},{key:"b",text:"Abstracció, encapsulació, modularitat, jerarquia i polimorfisme",correct:!0},{key:"c",text:"Classe, objecte, atribut, mètode i constructor",correct:!1},{key:"d",text:"Compilació, enllaç, interpretació, execució i depuració",correct:!1}],justification:"Definits per Grady Booch i els fonaments de l'enginyeria de software orientada a objectes."},{num:9,question:"En què consisteix la sobrecàrrega (overload) de mètodes?",options:[{key:"a",text:"Implementar diverses vegades un mateix mètode amb paràmetres diferents; el compilador decideix quin executar segons la crida",correct:!0},{key:"b",text:"Reimplementar un mètode heretat amb exactament la mateixa definició",correct:!1},{key:"c",text:"Declarar un mètode com a privat",correct:!1},{key:"d",text:"Copiar i enganxar codi en diverses classes",correct:!1}],justification:"L'overload permet que una classe tingui múltiples mètodes amb el mateix identificador però signatura diferent (nombre o tipus d'arguments)."},{num:10,question:"En què consisteix la sobreescriptura (override) de mètodes?",options:[{key:"a",text:"Definir el mateix nom de mètode amb paràmetres diferents",correct:!1},{key:"b",text:"Eliminar un mètode de la superclasse",correct:!1},{key:"c",text:"Reimplementar un mètode heretat d’una superclasse amb exactament la mateixa definició (nom, paràmetres i valor de retorn)",correct:!0},{key:"d",text:"Convertir un mètode públic en privat",correct:!1}],justification:"L'override (@Override a Java) permet a una subclasse proporcionar una implementació específica d'un mètode ja definit a la seva superclasse."}],I=`package cat.ioc.volei;

import java.awt.EventQueue;
import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;
import javax.swing.border.EtchedBorder;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JComboBox;
import javax.swing.DefaultComboBoxModel;
import javax.swing.JButton;
import javax.swing.SwingConstants;

/**
 * ============================================================================
 * EAC2 - Mòdul 0487 Entorns de Desenvolupament (IOC 2026-27)
 * Activitat 11: Simulador de Quota Anual d'un Soci de Club de Volei
 * Alumna: Blanca de Uña Martín (Cognom al títol: "deUna")
 * ============================================================================
 */
public class ClubVoleiFrame extends JFrame {

    private static final long serialVersionUID = 1L;
    private JPanel contentPane;

    // Bloc 1: Dades Soci
    private JPanel panelDadesSoci;
    private JTextField txtEdat;
    private JComboBox<String> comboCategoria;
    private JComboBox<String> comboTipusSoci;
    private JButton btnValidar;

    // Bloc 2: Opcions i Serveis
    private JPanel panelOpcionsServeis;
    private JComboBox<String> comboModalitat;
    private JComboBox<String> comboEquipacio;
    private JTextField txtDonacio;
    private JButton btnCalcular;
    private JButton btnEsborrarTot;

    // Bloc 3: Resultats
    private JTextField txtPreuBase;
    private JTextField txtIva;
    private JTextField txtTotal;

    // Bloc 4: Errors i Alertes
    private JTextField txtErrorsAlertes;

    public static void main(String[] args) {
        EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    ClubVoleiFrame frame = new ClubVoleiFrame();
                    frame.setVisible(true);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public ClubVoleiFrame() {
        setTitle("Simulador Quota Club Volei - deUna");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(100, 100, 720, 520);
        setResizable(false);
        setLocationRelativeTo(null);

        contentPane = new JPanel();
        contentPane.setBorder(new EmptyBorder(10, 10, 10, 10));
        setContentPane(contentPane);
        contentPane.setLayout(null);

        // ====================================================================
        // BLOC 1: DADES SOCI (SUPERIOR ESQUERRA)
        // ====================================================================
        panelDadesSoci = new JPanel();
        panelDadesSoci.setBorder(new TitledBorder(new EtchedBorder(), "Dades Soci", TitledBorder.LEADING, TitledBorder.TOP, null, new Color(30, 41, 59)));
        panelDadesSoci.setBounds(15, 15, 330, 215);
        panelDadesSoci.setLayout(null);
        contentPane.add(panelDadesSoci);

        JLabel lblEdat = new JLabel("Edat del soci (6 - 99):");
        lblEdat.setBounds(15, 25, 160, 20);
        panelDadesSoci.add(lblEdat);

        txtEdat = new JTextField();
        txtEdat.setToolTipText("Introduïu l'edat del soci (enter positiu entre 6 i 99 anys).");
        txtEdat.setBounds(15, 45, 300, 26);
        panelDadesSoci.add(txtEdat);

        JLabel lblCategoria = new JLabel("Categoria / Nivell:");
        lblCategoria.setBounds(15, 75, 160, 20);
        panelDadesSoci.add(lblCategoria);

        comboCategoria = new JComboBox<String>();
        comboCategoria.setToolTipText("Seleccioneu la categoria del soci.");
        comboCategoria.setModel(new DefaultComboBoxModel<String>(new String[] {
            "-- Seleccioneu Categoria --", 
            "Escolar", 
            "Base", 
            "Sènior", 
            "Master"
        }));
        comboCategoria.setBounds(15, 95, 300, 26);
        panelDadesSoci.add(comboCategoria);

        JLabel lblTipusSoci = new JLabel("Tipus de Soci:");
        lblTipusSoci.setBounds(15, 125, 160, 20);
        panelDadesSoci.add(lblTipusSoci);

        comboTipusSoci = new JComboBox<String>();
        comboTipusSoci.setToolTipText("Seleccioneu el tipus de soci.");
        comboTipusSoci.setModel(new DefaultComboBoxModel<String>(new String[] {
            "-- Seleccioneu Tipus de Soci --", 
            "Soci Jugador", 
            "Soci Familiar", 
            "Soci Simpatitzant"
        }));
        comboTipusSoci.setBounds(15, 145, 300, 26);
        panelDadesSoci.add(comboTipusSoci);

        btnValidar = new JButton("VALIDAR");
        btnValidar.setBounds(15, 178, 300, 28);
        panelDadesSoci.add(btnValidar);

        // ====================================================================
        // BLOC 2: OPCIONS I SERVEIS (SUPERIOR DRETA)
        // ====================================================================
        panelOpcionsServeis = new JPanel();
        panelOpcionsServeis.setBorder(new TitledBorder(new EtchedBorder(), "Opcions i Serveis", TitledBorder.LEADING, TitledBorder.TOP, null, new Color(30, 41, 59)));
        panelOpcionsServeis.setBounds(360, 15, 330, 215);
        panelOpcionsServeis.setLayout(null);
        contentPane.add(panelOpcionsServeis);

        JLabel lblModalitat = new JLabel("Modalitat de joc:");
        lblModalitat.setBounds(15, 20, 160, 18);
        panelOpcionsServeis.add(lblModalitat);

        comboModalitat = new JComboBox<String>();
        comboModalitat.setToolTipText("Trieu la modalitat de joc desitjada.");
        comboModalitat.setModel(new DefaultComboBoxModel<String>(new String[] {
            "-- Seleccioneu Modalitat --",
            "Només Pista",
            "Només Volei Platja",
            "Ambdós"
        }));
        comboModalitat.setBounds(15, 38, 300, 24);
        panelOpcionsServeis.add(comboModalitat);

        JLabel lblEquipacio = new JLabel("Equipació oficial completa:");
        lblEquipacio.setBounds(15, 66, 200, 18);
        panelOpcionsServeis.add(lblEquipacio);

        comboEquipacio = new JComboBox<String>();
        comboEquipacio.setToolTipText("Indiqueu si desitja adquirir l'equipació oficial (SÍ/NO).");
        comboEquipacio.setModel(new DefaultComboBoxModel<String>(new String[] {
            "-- Voleu Equipació? --",
            "SÍ",
            "NO"
        }));
        comboEquipacio.setBounds(15, 84, 300, 24);
        panelOpcionsServeis.add(comboEquipacio);

        JLabel lblDonacio = new JLabel("Aportació / Donació (€):");
        lblDonacio.setBounds(15, 112, 200, 18);
        panelOpcionsServeis.add(lblDonacio);

        txtDonacio = new JTextField();
        txtDonacio.setText("0");
        txtDonacio.setToolTipText("Quantitat voluntària en euros (0 si no desitja donar).");
        txtDonacio.setBounds(15, 130, 300, 24);
        panelOpcionsServeis.add(txtDonacio);

        btnCalcular = new JButton("CALCULAR");
        btnCalcular.setBounds(15, 168, 145, 34);
        panelOpcionsServeis.add(btnCalcular);

        btnEsborrarTot = new JButton("ESBORRAR TOT");
        btnEsborrarTot.setBounds(170, 168, 145, 34);
        panelOpcionsServeis.add(btnEsborrarTot);

        // ====================================================================
        // BLOC 3: RESULTATS (INFERIOR ESQUERRA)
        // ====================================================================
        JPanel panelResultats = new JPanel();
        panelResultats.setBorder(new TitledBorder(new EtchedBorder(), "Resultats", TitledBorder.LEADING, TitledBorder.TOP, null, new Color(30, 41, 59)));
        panelResultats.setBounds(15, 238, 330, 140);
        panelResultats.setLayout(null);
        contentPane.add(panelResultats);

        JLabel lblPreuBase = new JLabel("Preu Base (€):");
        lblPreuBase.setBounds(15, 25, 120, 20);
        panelResultats.add(lblPreuBase);

        txtPreuBase = new JTextField();
        txtPreuBase.setEditable(false);
        txtPreuBase.setHorizontalAlignment(SwingConstants.RIGHT);
        txtPreuBase.setBounds(140, 22, 175, 26);
        panelResultats.add(txtPreuBase);

        JLabel lblIva = new JLabel("IVA (21%) (€):");
        lblIva.setBounds(15, 60, 120, 20);
        panelResultats.add(lblIva);

        txtIva = new JTextField();
        txtIva.setEditable(false);
        txtIva.setHorizontalAlignment(SwingConstants.RIGHT);
        txtIva.setBounds(140, 57, 175, 26);
        panelResultats.add(txtIva);

        JLabel lblTotal = new JLabel("TOTAL (€):");
        lblTotal.setFont(new Font("Segoe UI", Font.BOLD, 13));
        lblTotal.setBounds(15, 95, 120, 20);
        panelResultats.add(lblTotal);

        txtTotal = new JTextField();
        txtTotal.setEditable(false);
        txtTotal.setFont(new Font("Segoe UI", Font.BOLD, 13));
        txtTotal.setHorizontalAlignment(SwingConstants.RIGHT);
        txtTotal.setBounds(140, 92, 175, 26);
        panelResultats.add(txtTotal);

        // ====================================================================
        // BLOC 4: ERRORS I ALERTES (INFERIOR DRETA)
        // ====================================================================
        JPanel panelAlertes = new JPanel();
        panelAlertes.setBorder(new TitledBorder(new EtchedBorder(), "Errors i Alertes", TitledBorder.LEADING, TitledBorder.TOP, null, new Color(30, 41, 59)));
        panelAlertes.setBounds(360, 238, 330, 140);
        panelAlertes.setLayout(null);
        contentPane.add(panelAlertes);

        txtErrorsAlertes = new JTextField();
        txtErrorsAlertes.setEditable(false);
        txtErrorsAlertes.setFont(new Font("Segoe UI", Font.BOLD, 12));
        txtErrorsAlertes.setForeground(new Color(185, 28, 28));
        txtErrorsAlertes.setBounds(15, 30, 300, 85);
        panelAlertes.add(txtErrorsAlertes);

        // Estat inicial: Bloc 2 desactivat
        setEstatInicial();

        // ====================================================================
        // GESTIÓ D'EVENTS: BOTÓ VALIDAR
        // ====================================================================
        btnValidar.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                txtErrorsAlertes.setText("");
                String strEdat = txtEdat.getText().trim();

                if (strEdat.isEmpty()) {
                    notificarError(txtEdat, "Error: L'edat és obligatòria. Introduïu un valor enter.");
                    return;
                }

                int edat = -1;
                try {
                    edat = Integer.parseInt(strEdat);
                } catch (NumberFormatException ex) {
                    notificarError(txtEdat, "Error: Format incorrecte. L'edat ha de ser un nombre enter.");
                    return;
                }

                if (edat < 6 || edat > 99) {
                    notificarError(txtEdat, "Error: L'edat ha d'estar compresa entre 6 i 99 anys (ambdós inclosos).");
                    return;
                }

                if (comboCategoria.getSelectedIndex() <= 0) {
                    comboCategoria.requestFocus();
                    txtErrorsAlertes.setText("Error: Heu de seleccionar una Categoria / Nivell vàlida.");
                    return;
                }

                if (comboTipusSoci.getSelectedIndex() <= 0) {
                    comboTipusSoci.requestFocus();
                    txtErrorsAlertes.setText("Error: Heu de seleccionar un Tipus de Soci vàlid.");
                    return;
                }

                // Si tot és correcte: deshabilitar bloc 1 i habilitar bloc 2
                txtEdat.setEnabled(false);
                comboCategoria.setEnabled(false);
                comboTipusSoci.setEnabled(false);
                btnValidar.setEnabled(false);

                comboModalitat.setEnabled(true);
                comboEquipacio.setEnabled(true);
                txtDonacio.setEnabled(true);
                btnCalcular.setEnabled(true);
                btnEsborrarTot.setEnabled(true);

                txtErrorsAlertes.setText("✓ Dades del soci validades correctament. Configureu les opcions.");
                comboModalitat.requestFocus();
            }
        });

        // ====================================================================
        // GESTIÓ D'EVENTS: BOTÓ CALCULAR
        // ====================================================================
        btnCalcular.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                txtErrorsAlertes.setText("");

                if (comboModalitat.getSelectedIndex() <= 0) {
                    comboModalitat.requestFocus();
                    txtErrorsAlertes.setText("Error: Seleccioneu una Modalitat de joc.");
                    return;
                }

                if (comboEquipacio.getSelectedIndex() <= 0) {
                    comboEquipacio.requestFocus();
                    txtErrorsAlertes.setText("Error: Indiqueu si voleu l'equipació oficial (SÍ/NO).");
                    return;
                }

                String strDonacio = txtDonacio.getText().trim();
                double donacio = 0.0;
                try {
                    donacio = Double.parseDouble(strDonacio);
                    if (donacio < 0) {
                        notificarError(txtDonacio, "Error: L'aportació / donació ha de ser un import igual o superior a 0.");
                        return;
                    }
                } catch (NumberFormatException ex) {
                    notificarError(txtDonacio, "Error: Format incorrecte a la donació. Introduïu un valor numèric vàlid.");
                    return;
                }

                // Càlcul de la Quota Base segons Categoria
                double quotaBaseCategoria = 0.0;
                String cat = (String) comboCategoria.getSelectedItem();
                if ("Escolar".equals(cat)) quotaBaseCategoria = 250.0;
                else if ("Base".equals(cat)) quotaBaseCategoria = 400.0;
                else if ("Sènior".equals(cat)) quotaBaseCategoria = 500.0;
                else if ("Master".equals(cat)) quotaBaseCategoria = 600.0;

                // Factor segons Tipus de Soci
                double factorSoci = 1.0;
                String tipus = (String) comboTipusSoci.getSelectedItem();
                if ("Soci Jugador".equals(tipus)) factorSoci = 1.00;
                else if ("Soci Familiar".equals(tipus)) factorSoci = 0.85;
                else if ("Soci Simpatitzant".equals(tipus)) factorSoci = 0.60;

                // Suplements de Serveis
                double suplementModalitat = 0.0;
                String mod = (String) comboModalitat.getSelectedItem();
                if ("Ambdós".equals(mod)) suplementModalitat = 120.0;

                double suplementEquipacio = 0.0;
                String eq = (String) comboEquipacio.getSelectedItem();
                if ("SÍ".equals(eq)) suplementEquipacio = 95.0;

                // Fórmules oficials
                double preuBase = (quotaBaseCategoria * factorSoci) + suplementModalitat + suplementEquipacio + donacio;
                double iva21 = preuBase * 0.21;
                double total = preuBase + iva21;

                // Mostrar resultats formatats a 2 decimals
                txtPreuBase.setText(String.format("%.2f €", preuBase));
                txtIva.setText(String.format("%.2f €", iva21));
                txtTotal.setText(String.format("%.2f €", total));

                txtErrorsAlertes.setText("✓ Càlcul completat amb èxit. TOTAL: " + String.format("%.2f €", total));
            }
        });

        // ====================================================================
        // GESTIÓ D'EVENTS: BOTÓ ESBORRAR TOT
        // ====================================================================
        btnEsborrarTot.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                setEstatInicial();
                txtEdat.requestFocus();
            }
        });
    }

    private void notificarError(JTextField camp, String missatge) {
        camp.requestFocus();
        camp.selectAll();
        txtErrorsAlertes.setText(missatge);
    }

    private void setEstatInicial() {
        txtEdat.setEnabled(true);
        txtEdat.setText("");
        comboCategoria.setEnabled(true);
        comboCategoria.setSelectedIndex(0);
        comboTipusSoci.setEnabled(true);
        comboTipusSoci.setSelectedIndex(0);
        btnValidar.setEnabled(true);

        comboModalitat.setEnabled(false);
        comboModalitat.setSelectedIndex(0);
        comboEquipacio.setEnabled(false);
        comboEquipacio.setSelectedIndex(0);
        txtDonacio.setEnabled(false);
        txtDonacio.setText("0");
        btnCalcular.setEnabled(false);
        btnEsborrarTot.setEnabled(false);

        txtPreuBase.setText("");
        txtIva.setText("");
        txtTotal.setText("");
        txtErrorsAlertes.setText("");
    }
}`,R=`package com.exemple.web.servidor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * ============================================================================
 * EAC2 - Mòdul 0487 Entorns de Desenvolupament (IOC 2026-27)
 * Activitat 12: Aplicació Client-Servidor Spring a Tomcat
 * Alumna: Blanca de Uña Martín
 * DNI Requerit a sota del títol: Blanca de Uña Martín (DNI de l'alumna)
 * Operació: Quàdruple (x 4) del valor introduït
 * ============================================================================
 */
@RestController
public class Controlador {

    @GetMapping("/")
    public String index() {
        return "<html><head><meta charset='UTF-8'><title>Càlcul Quàdruple - Spring</title></head><body>"
             + "<h1>Calcula el quàdruple del valor</h1>"
             + "<p style='color:#2563eb; font-weight:bold;'>Alumna: Blanca de Uña Martín · DNI: 12345678Z (DNI fictici - Art. 5.1.c RGPD)</p>"
             + "<form action='/dobla' method='GET'>"
             + "<h3>Introdueix l'enter:</h3>"
             + "<input type='text' name='enter' style='padding:5px; font-size:16px;' />"
             + "<input type='submit' value='Enviar' style='padding:5px 12px; margin-left:8px;' />"
             + "</form>"
             + "</body></html>";
    }

    @GetMapping("/dobla")
    public String resultat(@RequestParam("enter") String enter) {
        try {
            int valor = Integer.parseInt(enter.trim());
            // REQUERIMENT EAC2: Calcular el QUÀDRUPLE (x 4) en lloc del doble
            int resultat = valor * 4;

            return "<html><head><meta charset='UTF-8'><title>Resultat Quàdruple - Spring</title></head><body>"
                 + "<h1>Calcula el quàdruple del valor</h1>"
                 + "<p style='color:#2563eb; font-weight:bold;'>Alumna: Blanca de Uña Martín · DNI: 12345678Z (DNI fictici - Art. 5.1.c RGPD)</p>"
                 + "<h2 style='color:#059669;'>Resultat: " + resultat + "</h2>"
                 + "<p>(Valor introduït: " + valor + " &times; 4 = " + resultat + ")</p>"
                 + "<br/><a href='/'>&larr; Tornar a introduir un altre número</a>"
                 + "</body></html>";

        } catch (NumberFormatException e) {
            return "<html><head><meta charset='UTF-8'><title>Error de Format</title></head><body>"
                 + "<h1>Calcula el quàdruple del valor</h1>"
                 + "<p style='color:#2563eb; font-weight:bold;'>Alumna: Blanca de Uña Martín · DNI: 12345678Z (DNI fictici - Art. 5.1.c RGPD)</p>"
                 + "<h2 style='color:#dc2626;'>El valor introdu&iuml;t no &eacute;s un enter vàlid</h2>"
                 + "<br/><a href='/'>&larr; Tornar a intentar-ho</a>"
                 + "</body></html>";
        }
    }
}`,q=`package cat.ioc.copilot;

/**
 * ============================================================================
 * EAC2 - Mòdul 0487 Entorns de Desenvolupament (IOC 2026-27)
 * Activitat 13: Exercici assistit amb GitHub Copilot
 * Alumna: Blanca de Uña Martín
 * ============================================================================
 */
public class CopilotAssistent {

    /*
     * MÈTODE 1: ocultarVocals(String text)
     * Objectiu: Rebre una cadena de text i retornar la mateixa cadena en la qual
     * totes les vocals (a, e, i, o, u), tant en minúscules com en majúscules,
     * així com les vocals amb accents gràfics o dièresi (à, è, é, í, ò, ó, ú, ï, ü)
     * hagin estat substituïdes per un asterisc (*).
     * 
     * Exemple: "Entorns de Desenvolupament" -> "*nt*rns d* D*s*nv*l*p*m*nt"
     */
    public static String ocultarVocals(String text) {
        if (text == null) {
            return null;
        }
        // Expressió regular que cobreix vocals simples, accentuades i amb dièresi
        return text.replaceAll("(?i)[aeiouàèéíòóúïü]", "*");
    }

    /*
     * MÈTODE 2: comptarParaules(String text)
     * Objectiu: Rebre una cadena de text i retornar el nombre de paraules
     * contingudes a la cadena, separades per un o més espais en blanc.
     * Gestiona cadenes buides o amb múltiples espais consecutius.
     * 
     * Exemple: "Entorns de Desenvolupament" -> 3 paraules
     */
    public static int comptarParaules(String text) {
        if (text == null || text.trim().isEmpty()) {
            return 0;
        }
        // Separem per un o més espais en blanc mitjançant l'expressió regular \\s+
        String[] paraules = text.trim().split("\\\\s+");
        return paraules.length;
    }

    public static void main(String[] args) {
        String prova = "Entorns de Desenvolupament";
        System.out.println("Original: " + prova);
        System.out.println("Vocals ocultes: " + ocultarVocals(prova));
        System.out.println("Nombre de paraules: " + comptarParaules(prova));
    }
}`;function H(){const[h,E]=u.useState("tareas"),[d,f]=u.useState("part-swing"),[j,C]=u.useState(null),[T,p]=u.useState(null),[z,w]=u.useState(!1),v=()=>{p("Obrint la carpeta de resultats al Finder de macOS..."),fetch("/api/open-folder?path=public/eacs/ent/EAC2").then(a=>a.json()).then(()=>{p("✅ Carpeta oberta al Finder! (public/eacs/ent/EAC2)"),setTimeout(()=>p(null),4e3)}).catch(()=>{p("⚠️ Error obrint al Finder. Ruta: public/eacs/ent/EAC2"),setTimeout(()=>p(null),5e3)})},P=()=>{navigator.clipboard.writeText("public/eacs/ent/EAC2"),w(!0),p("📋 Ruta copiada al porta-retalls: public/eacs/ent/EAC2"),setTimeout(()=>{w(!1),p(null)},3500)},[r,l]=u.useState({isBloc1Enabled:!0,edat:"",categoria:"",tipusSoci:"",isBloc2Enabled:!1,modalitat:"",equipacio:"",donacio:"0",preuBase:"",iva:"",total:"",alertaText:"",alertaType:"empty",hasEdatError:!1,hasDonacioError:!1}),[t,A]=k("ent_eac2_completed",{},{category:"ioc"}),[b,F]=k("ent_eac2_test_answers",{},{category:"ioc"}),S=u.useCallback(a=>{A(s=>({...s,[a]:!s[a]}))},[A]),O=(a,s)=>{F(i=>({...i,[a]:s}))},y=(a,s)=>{var i;(i=navigator==null?void 0:navigator.clipboard)!=null&&i.writeText&&navigator.clipboard.writeText(a),C(s),setTimeout(()=>C(null),1800)},N=u.useMemo(()=>{let a=0,s=0;g.forEach(n=>{const m=b[n.num];if(m){const o=n.options.find(c=>c.key===m);o!=null&&o.correct?a++:s++}});const i=Math.max(0,+(a*.2-s*.04).toFixed(2));return{correct:a,wrong:s,score:i,total:g.length}},[b]),M=()=>{const a=r.edat.trim();if(!a){l(i=>({...i,hasEdatError:!0,alertaType:"error",alertaText:"Error: L'edat és obligatòria. Introduïu un valor enter."}));return}const s=Number(a);if(isNaN(s)||!Number.isInteger(s)){l(i=>({...i,hasEdatError:!0,alertaType:"error",alertaText:"Error: Format incorrecte. L'edat ha de ser un nombre enter."}));return}if(s<6||s>99){l(i=>({...i,hasEdatError:!0,alertaType:"error",alertaText:"Error: L'edat ha d'estar compresa entre 6 i 99 anys (ambdós inclosos)."}));return}if(!r.categoria){l(i=>({...i,alertaType:"error",alertaText:"Error: Heu de seleccionar una Categoria / Nivell vàlida."}));return}if(!r.tipusSoci){l(i=>({...i,alertaType:"error",alertaText:"Error: Heu de seleccionar un Tipus de Soci vàlid."}));return}l(i=>({...i,isBloc1Enabled:!1,isBloc2Enabled:!0,hasEdatError:!1,alertaType:"success",alertaText:"✓ Dades del soci validades correctament. Configureu les opcions de joc."}))},L=()=>{if(!r.modalitat){l(x=>({...x,alertaType:"error",alertaText:"Error: Seleccioneu una Modalitat de joc."}));return}if(!r.equipacio){l(x=>({...x,alertaType:"error",alertaText:"Error: Indiqueu si voleu l'equipació oficial (SÍ/NO)."}));return}const a=r.donacio.trim(),s=Number(a);if(isNaN(s)||s<0){l(x=>({...x,hasDonacioError:!0,alertaType:"error",alertaText:"Error: L'aportació / donació ha de ser un import numèric igual o superior a 0."}));return}let i=0;r.categoria==="Escolar"?i=250:r.categoria==="Base"?i=400:r.categoria==="Sènior"?i=500:r.categoria==="Master"&&(i=600);let n=1;r.tipusSoci==="Soci Jugador"?n=1:r.tipusSoci==="Soci Familiar"?n=.85:r.tipusSoci==="Soci Simpatitzant"&&(n=.6);const m=r.modalitat==="Ambdós"?120:0,o=r.equipacio==="SÍ"?95:0,c=i*n+m+o+s,B=c*.21,D=c+B;l(x=>({...x,hasDonacioError:!1,preuBase:`${c.toFixed(2)} €`,iva:`${B.toFixed(2)} €`,total:`${D.toFixed(2)} €`,alertaType:"success",alertaText:`✓ Càlcul completat amb èxit. TOTAL: ${D.toFixed(2)} €`}))},J=()=>{l({isBloc1Enabled:!0,edat:"",categoria:"",tipusSoci:"",isBloc2Enabled:!1,modalitat:"",equipacio:"",donacio:"0",preuBase:"",iva:"",total:"",alertaText:"",alertaType:"empty",hasEdatError:!1,hasDonacioError:!1})};return e.jsxs("div",{className:"ent-eac2-root",children:[e.jsxs("header",{className:"ent-eac2-header",children:[e.jsxs("div",{className:"ent-eac2-header-left",children:[e.jsx(W,{to:"/ioc/entornos",style:{color:"#475569",textDecoration:"none",fontSize:"0.85rem",fontWeight:800,padding:"0.4rem 0.8rem",borderRadius:"7px",border:"1px solid #cbd5e1",background:"#f1f5f9"},children:"← Tornar a ENT"}),e.jsx("span",{className:"ent-eac2-badge",children:"ENT · EAC 2"}),e.jsxs("div",{className:"ent-eac2-header-title",children:[e.jsx("h1",{children:"🛠️ EAC 2 Workbench: Swing, Spring & Copilot"}),e.jsx("p",{children:"Mòdul 0487 · Desenvolupament de programari · Entrega: 17/11/2026"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[e.jsx("button",{type:"button",onClick:v,style:{display:"inline-flex",alignItems:"center",gap:"0.4rem",padding:"0.45rem 0.85rem",borderRadius:"8px",border:"1px solid #cbd5e1",background:"#f8fafc",color:"#0f172a",fontSize:"0.82rem",fontWeight:700,cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"},title:"Abrir carpeta de resultados en macOS Finder",children:"📂 Abrir Carpeta (Finder)"}),e.jsxs("div",{className:"ent-eac2-mode-pills",children:[e.jsxs("button",{type:"button",className:`ent-eac2-mode-btn ${h==="tareas"?"active":""}`,onClick:()=>E("tareas"),children:[e.jsx("span",{children:"📋"}),e.jsx("span",{children:"Modo Tareas (Opción 1)"})]}),e.jsxs("button",{type:"button",className:`ent-eac2-mode-btn ${h==="memoria"?"active":""}`,onClick:()=>E("memoria"),children:[e.jsx("span",{children:"📄"}),e.jsx("span",{children:"Modo Memoria Oficial (Opción 2)"})]})]}),h==="memoria"&&e.jsxs("button",{type:"button",className:"ent-eac2-print-btn",onClick:()=>window.print(),title:"Imprimir o desar com a PDF oficial per a la tramesa al Moodle (Cmd + P)",children:[e.jsx("span",{children:"🖨️"}),e.jsx("span",{children:"Imprimir / Desar PDF"})]})]})]}),e.jsxs("div",{className:"ent-eac2-container",children:[e.jsxs("div",{className:"ent-folder-banner",children:[e.jsxs("div",{className:"ent-folder-banner-left",children:[e.jsx("div",{className:"ent-folder-banner-icon",children:"📁"}),e.jsxs("div",{children:[e.jsxs("div",{className:"ent-folder-banner-title",children:["Carpeta de Resultats & Lliurables EAC 2",e.jsx("span",{className:"ent-folder-banner-badge",children:"Local macOS"})]}),e.jsxs("div",{className:"ent-folder-banner-path",children:[e.jsx("span",{children:"Ruta local:"}),e.jsx("code",{children:"public/eacs/ent/EAC2"})]})]})]}),e.jsxs("div",{className:"ent-folder-banner-actions",children:[e.jsx("button",{type:"button",className:"ent-folder-btn-primary",onClick:v,title:"Obrir directament la carpeta a macOS Finder",children:"📂 Obrir al Finder"}),e.jsx("button",{type:"button",className:"ent-folder-btn-secondary",onClick:P,title:"Copiar ruta absoluta al porta-retalls",children:z?"✅ Copiada!":"📋 Copiar Ruta"}),e.jsx("a",{href:"/eacs/ent/EAC2/exercici11.zip",download:!0,className:"ent-folder-file-chip",title:"Descarregar directament exercici11.zip",children:"📦 exercici11.zip"}),e.jsx("a",{href:"/eacs/ent/EAC2/src/cat/ioc/volei/ClubVoleiFrame.java",download:!0,className:"ent-folder-file-chip",title:"Descarregar codi font Java Swing",children:"☕ ClubVoleiFrame.java"})]})]}),h==="tareas"?e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.8rem",marginBottom:"0.9rem",padding:"0.65rem 1.1rem",background:"#ffffff",borderRadius:"10px",border:"1px solid #e2e8f0",boxShadow:"0 1px 4px rgba(0, 0, 0, 0.03)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem"},children:[e.jsx("span",{style:{fontSize:"1.1rem"},children:"📋"}),e.jsx("span",{style:{fontWeight:800,fontSize:"0.88rem",color:"#0f172a"},children:"Avenç de la EAC 2:"}),e.jsxs("span",{style:{fontWeight:800,fontSize:"0.82rem",padding:"0.2rem 0.55rem",borderRadius:"6px",background:t["part-test"]&&t["part-swing"]&&t["part-spring"]&&t["part-copilot"]?"#dcfce7":"#eff6ff",color:t["part-test"]&&t["part-swing"]&&t["part-spring"]&&t["part-copilot"]?"#15803d":"#2563eb"},children:[[t["part-test"],t["part-swing"],t["part-spring"],t["part-copilot"]].filter(Boolean).length," de 4 parts completades (",Math.round([t["part-test"],t["part-swing"],t["part-spring"],t["part-copilot"]].filter(Boolean).length/4*100),"%)"]})]}),e.jsx("div",{style:{width:"180px",height:"8px",background:"#f1f5f9",borderRadius:"999px",overflow:"hidden",border:"1px solid #e2e8f0"},children:e.jsx("div",{style:{width:`${[t["part-test"],t["part-swing"],t["part-spring"],t["part-copilot"]].filter(Boolean).length/4*100}%`,height:"100%",background:[t["part-test"],t["part-swing"],t["part-spring"],t["part-copilot"]].filter(Boolean).length===4?"#22c55e":"linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",transition:"width 0.3s ease"}})})]}),e.jsxs("div",{className:"ent-eac2-parts-nav",children:[e.jsxs("div",{className:`ent-eac2-part-card ${d==="part-test"?"active":""} ${t["part-test"]?"completed":""}`,onClick:()=>f("part-test"),children:[e.jsxs("div",{children:[e.jsxs("div",{className:"ent-eac2-part-header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{className:"ent-eac2-part-num",children:"Apartat 1"}),t["part-test"]&&e.jsx("span",{style:{fontSize:"0.72rem",color:"#16a34a",fontWeight:800},children:"✓ Fet"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{className:"ent-eac2-part-score",children:"2.0 punts"}),e.jsxs("label",{onClick:a=>a.stopPropagation(),style:{display:"inline-flex",alignItems:"center",gap:"0.3rem",cursor:"pointer",padding:"0.15rem 0.45rem",borderRadius:"5px",background:t["part-test"]?"#dcfce7":"#f8fafc",border:t["part-test"]?"1px solid #86efac":"1px solid #cbd5e1",color:t["part-test"]?"#15803d":"#64748b",fontSize:"0.72rem",fontWeight:700,userSelect:"none",transition:"all 0.15s ease"},title:t["part-test"]?"Marcar com a pendent":"Marcar com a fet",children:[e.jsx("input",{type:"checkbox",checked:!!t["part-test"],onChange:()=>S("part-test"),style:{cursor:"pointer",accentColor:"#16a34a",width:"13px",height:"13px",margin:0}}),e.jsx("span",{children:t["part-test"]?"Fet":"Fet?"})]})]})]}),e.jsxs("h3",{className:"ent-eac2-part-title",children:[t["part-test"]&&e.jsx("span",{style:{color:"#16a34a",marginRight:"0.3rem"},children:"✓"}),"Test Desenvolupament"]}),e.jsx("p",{className:"ent-eac2-part-desc",children:"10 preguntes oficials sobre conceptes, paradigmes i POO."})]}),e.jsx("div",{style:{marginTop:"0.8rem",fontSize:"0.78rem",color:t["part-test"]?"#16a34a":"#60a5fa",fontWeight:800},children:t["part-test"]?"✅ Apartat 1 completat":`Nota estimada: ${N.score} / 2.0 pts`})]}),e.jsxs("div",{className:`ent-eac2-part-card ${d==="part-swing"?"active":""} ${t["part-swing"]?"completed":""}`,onClick:()=>f("part-swing"),children:[e.jsxs("div",{children:[e.jsxs("div",{className:"ent-eac2-part-header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{className:"ent-eac2-part-num",children:"Activitat 11"}),t["part-swing"]&&e.jsx("span",{style:{fontSize:"0.72rem",color:"#16a34a",fontWeight:800},children:"✓ Fet"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{className:"ent-eac2-part-score",children:"5.0 punts"}),e.jsxs("label",{onClick:a=>a.stopPropagation(),style:{display:"inline-flex",alignItems:"center",gap:"0.3rem",cursor:"pointer",padding:"0.15rem 0.45rem",borderRadius:"5px",background:t["part-swing"]?"#dcfce7":"#f8fafc",border:t["part-swing"]?"1px solid #86efac":"1px solid #cbd5e1",color:t["part-swing"]?"#15803d":"#64748b",fontSize:"0.72rem",fontWeight:700,userSelect:"none",transition:"all 0.15s ease"},title:t["part-swing"]?"Marcar com a pendent":"Marcar com a fet",children:[e.jsx("input",{type:"checkbox",checked:!!t["part-swing"],onChange:()=>S("part-swing"),style:{cursor:"pointer",accentColor:"#16a34a",width:"13px",height:"13px",margin:0}}),e.jsx("span",{children:t["part-swing"]?"Fet":"Fet?"})]})]})]}),e.jsxs("h3",{className:"ent-eac2-part-title",children:[t["part-swing"]&&e.jsx("span",{style:{color:"#16a34a",marginRight:"0.3rem"},children:"✓"}),"Java Swing (Volei)"]}),e.jsx("p",{className:"ent-eac2-part-desc",children:"WindowBuilder Pro, validacions de focus i càlculs de quota."})]}),e.jsx("div",{style:{marginTop:"0.8rem",fontSize:"0.78rem",color:t["part-swing"]?"#16a34a":"#38bdf8",fontWeight:800},children:t["part-swing"]?"✅ Codi i exercici11.zip llestos":"Simulador & Codi font disponible"})]}),e.jsxs("div",{className:`ent-eac2-part-card ${d==="part-spring"?"active":""} ${t["part-spring"]?"completed":""}`,onClick:()=>f("part-spring"),children:[e.jsxs("div",{children:[e.jsxs("div",{className:"ent-eac2-part-header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{className:"ent-eac2-part-num",children:"Activitat 12"}),t["part-spring"]&&e.jsx("span",{style:{fontSize:"0.72rem",color:"#16a34a",fontWeight:800},children:"✓ Fet"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{className:"ent-eac2-part-score",children:"2.0 punts"}),e.jsxs("label",{onClick:a=>a.stopPropagation(),style:{display:"inline-flex",alignItems:"center",gap:"0.3rem",cursor:"pointer",padding:"0.15rem 0.45rem",borderRadius:"5px",background:t["part-spring"]?"#dcfce7":"#f8fafc",border:t["part-spring"]?"1px solid #86efac":"1px solid #cbd5e1",color:t["part-spring"]?"#15803d":"#64748b",fontSize:"0.72rem",fontWeight:700,userSelect:"none",transition:"all 0.15s ease"},title:t["part-spring"]?"Marcar com a pendent":"Marcar com a fet",children:[e.jsx("input",{type:"checkbox",checked:!!t["part-spring"],onChange:()=>S("part-spring"),style:{cursor:"pointer",accentColor:"#16a34a",width:"13px",height:"13px",margin:0}}),e.jsx("span",{children:t["part-spring"]?"Fet":"Fet?"})]})]})]}),e.jsxs("h3",{className:"ent-eac2-part-title",children:[t["part-spring"]&&e.jsx("span",{style:{color:"#16a34a",marginRight:"0.3rem"},children:"✓"}),"Spring Boot & Tomcat"]}),e.jsx("p",{className:"ent-eac2-part-desc",children:"API REST web, càlcul del quàdruple (x4) i DNI de Blanca."})]}),e.jsx("div",{style:{marginTop:"0.8rem",fontSize:"0.78rem",color:t["part-spring"]?"#16a34a":"#34d399",fontWeight:800},children:t["part-spring"]?"✅ Captura i exercici12.zip fets":"Captura exercici12.jpg & Codi"})]}),e.jsxs("div",{className:`ent-eac2-part-card ${d==="part-copilot"?"active":""} ${t["part-copilot"]?"completed":""}`,onClick:()=>f("part-copilot"),children:[e.jsxs("div",{children:[e.jsxs("div",{className:"ent-eac2-part-header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{className:"ent-eac2-part-num",children:"Activitat 13"}),t["part-copilot"]&&e.jsx("span",{style:{fontSize:"0.72rem",color:"#16a34a",fontWeight:800},children:"✓ Fet"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{className:"ent-eac2-part-score",children:"1.0 punt"}),e.jsxs("label",{onClick:a=>a.stopPropagation(),style:{display:"inline-flex",alignItems:"center",gap:"0.3rem",cursor:"pointer",padding:"0.15rem 0.45rem",borderRadius:"5px",background:t["part-copilot"]?"#dcfce7":"#f8fafc",border:t["part-copilot"]?"1px solid #86efac":"1px solid #cbd5e1",color:t["part-copilot"]?"#15803d":"#64748b",fontSize:"0.72rem",fontWeight:700,userSelect:"none",transition:"all 0.15s ease"},title:t["part-copilot"]?"Marcar com a pendent":"Marcar com a fet",children:[e.jsx("input",{type:"checkbox",checked:!!t["part-copilot"],onChange:()=>S("part-copilot"),style:{cursor:"pointer",accentColor:"#16a34a",width:"13px",height:"13px",margin:0}}),e.jsx("span",{children:t["part-copilot"]?"Fet":"Fet?"})]})]})]}),e.jsxs("h3",{className:"ent-eac2-part-title",children:[t["part-copilot"]&&e.jsx("span",{style:{color:"#16a34a",marginRight:"0.3rem"},children:"✓"}),"GitHub Copilot"]}),e.jsx("p",{className:"ent-eac2-part-desc",children:"Eclipse Marketplace, mètodes de vocals i comptador de paraules."})]}),e.jsx("div",{style:{marginTop:"0.8rem",fontSize:"0.78rem",color:t["part-copilot"]?"#16a34a":"#a78bfa",fontWeight:800},children:t["part-copilot"]?"✅ Reflexió i captura llesta":"Guia d'ús & Respostes llestes"})]})]}),d==="part-test"&&e.jsxs("div",{className:"ent-task-card",children:[e.jsxs("div",{className:"ent-task-header",children:[e.jsxs("div",{children:[e.jsx("span",{className:"ent-task-badge",children:"Apartat 1"}),e.jsx("h2",{style:{display:"inline",fontSize:"1.2rem",color:"#0f172a",fontWeight:800},children:"Desenvolupament de programari (10 Preguntes Tipus Test · 2.0 punts)"}),e.jsxs("p",{style:{margin:"0.5rem 0 0 0",color:"#64748b",fontSize:"0.85rem"},children:["Cada encert suma ",e.jsx("strong",{children:"+0.20 punts"}),". Cada errada resta ",e.jsx("strong",{children:"-0.04 punts"}),". Les preguntes en blanc no penalitzen."]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:"0.8rem",color:"#64748b"},children:"Nota aconseguida:"}),e.jsxs("div",{style:{fontSize:"1.4rem",fontWeight:900,color:"#2563eb"},children:[N.score," / 2.0"]})]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1.2rem",marginTop:"1rem"},children:g.map(a=>{const s=b[a.num];return e.jsxs("div",{style:{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"8px",padding:"1.1rem"},children:[e.jsxs("div",{style:{fontWeight:800,fontSize:"0.95rem",color:"#0f172a",marginBottom:"0.7rem"},children:[e.jsxs("span",{style:{color:"#2563eb",marginRight:"0.4rem"},children:[a.num,"."]}),a.question]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr",gap:"0.45rem"},children:a.options.map(i=>{const n=s===i.key;let m="1px solid #cbd5e1",o="#ffffff",c="#334155";return n&&(i.correct?(m="1px solid #10b981",o="#ecfdf5",c="#065f46"):(m="1px solid #ef4444",o="#fef2f2",c="#991b1b")),e.jsxs("button",{type:"button",onClick:()=>O(a.num,i.key),style:{textAlign:"left",padding:"0.6rem 0.9rem",borderRadius:"6px",border:m,background:o,color:c,fontSize:"0.83rem",fontWeight:n?700:500,cursor:"pointer",transition:"all 0.15s ease"},children:[e.jsxs("strong",{style:{color:n?"inherit":"#2563eb",marginRight:"0.5rem"},children:["[",i.key.toUpperCase(),"]"]}),i.text]},i.key)})}),s&&e.jsxs("div",{style:{marginTop:"0.6rem",fontSize:"0.78rem",color:"#64748b",fontStyle:"italic"},children:["💡 ",a.justification]})]},a.num)})}),e.jsxs("div",{style:{marginTop:"2rem"},children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:800,color:"#0f172a",marginBottom:"0.5rem"},children:"📋 Graella de Respostes Oficial (per a enganxar al document .odt)"}),e.jsxs("table",{className:"ent-answers-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:g.map(a=>e.jsx("th",{children:a.num},a.num))})}),e.jsx("tbody",{children:e.jsx("tr",{children:g.map(a=>{const s=b[a.num];return e.jsx("td",{children:s?s.toUpperCase():"-"},a.num)})})})]})]})]}),d==="part-swing"&&e.jsx("div",{children:e.jsxs("div",{className:"ent-task-card",children:[e.jsx("div",{className:"ent-task-header",children:e.jsxs("div",{children:[e.jsx("span",{className:"ent-task-badge",children:"Activitat 11 · 5.0 punts"}),e.jsx("h2",{style:{display:"inline",fontSize:"1.2rem",color:"#0f172a",fontWeight:800},children:"Simulador Quota Club de Volei (Java Swing & WindowBuilder Pro)"}),e.jsxs("p",{style:{margin:"0.5rem 0 0 0",color:"#64748b",fontSize:"0.85rem"},children:["Títol de la finestra amb el cognom de l'alumna: ",e.jsx("code",{children:'"Simulador Quota Club Volei - deUna"'}),". Requeriment de components Swing purs (no SWT), tooltips a tots els camps editables, mètodes ",e.jsx("code",{children:"requestFocus()"})," i ",e.jsx("code",{children:"selectAll()"})," en cas d'error."]})]})}),e.jsx("h3",{style:{fontSize:"0.95rem",color:"#0284c7",fontWeight:800,margin:"1rem 0 0.5rem 0"},children:"🎮 Prova en Viu: Rèplica Interactiva de la Interfície Swing"}),e.jsxs("div",{className:"swing-simulator-window",children:[e.jsxs("div",{className:"swing-window-titlebar",children:[e.jsx("span",{children:"Simulador Quota Club Volei - deUna"}),e.jsxs("div",{className:"swing-window-controls",children:[e.jsx("span",{className:"swing-control-btn",style:{background:"#f59e0b"}}),e.jsx("span",{className:"swing-control-btn",style:{background:"#10b981"}}),e.jsx("span",{className:"swing-control-btn",style:{background:"#ef4444"}})]})]}),e.jsxs("div",{className:"swing-layout-grid",children:[e.jsxs("div",{className:`swing-box ${r.isBloc1Enabled?"":"disabled"}`,children:[e.jsx("div",{className:"swing-box-title",children:"Dades Soci"}),e.jsxs("div",{className:"swing-field-group",children:[e.jsx("label",{children:"Edat del soci (6 - 99):"}),e.jsx("input",{type:"text",title:"Introduïu l'edat del soci (enter positiu entre 6 i 99 anys).",className:`swing-input ${r.hasEdatError?"error":""}`,placeholder:"Ex: 24",disabled:!r.isBloc1Enabled,value:r.edat,onChange:a=>l({...r,edat:a.target.value})})]}),e.jsxs("div",{className:"swing-field-group",children:[e.jsx("label",{children:"Categoria / Nivell:"}),e.jsxs("select",{className:"swing-input",title:"Seleccioneu la categoria del soci.",disabled:!r.isBloc1Enabled,value:r.categoria,onChange:a=>l({...r,categoria:a.target.value}),children:[e.jsx("option",{value:"",children:"-- Seleccioneu Categoria --"}),e.jsx("option",{value:"Escolar",children:"Escolar (250 €)"}),e.jsx("option",{value:"Base",children:"Base (400 €)"}),e.jsx("option",{value:"Sènior",children:"Sènior (500 €)"}),e.jsx("option",{value:"Master",children:"Master (600 €)"})]})]}),e.jsxs("div",{className:"swing-field-group",children:[e.jsx("label",{children:"Tipus de Soci:"}),e.jsxs("select",{className:"swing-input",title:"Seleccioneu el tipus de soci.",disabled:!r.isBloc1Enabled,value:r.tipusSoci,onChange:a=>l({...r,tipusSoci:a.target.value}),children:[e.jsx("option",{value:"",children:"-- Seleccioneu Tipus de Soci --"}),e.jsx("option",{value:"Soci Jugador",children:"Soci Jugador (100% preu)"}),e.jsx("option",{value:"Soci Familiar",children:"Soci Familiar (15% descompte)"}),e.jsx("option",{value:"Soci Simpatitzant",children:"Soci Simpatitzant (40% descompte)"})]})]}),e.jsx("button",{type:"button",className:"swing-action-btn swing-btn-primary",style:{width:"100%",marginTop:"0.4rem"},disabled:!r.isBloc1Enabled,onClick:M,children:"VALIDAR"})]}),e.jsxs("div",{className:`swing-box ${r.isBloc2Enabled?"":"disabled"}`,children:[e.jsx("div",{className:"swing-box-title",children:"Opcions i Serveis"}),e.jsxs("div",{className:"swing-field-group",children:[e.jsx("label",{children:"Modalitat de joc:"}),e.jsxs("select",{className:"swing-input",title:"Trieu la modalitat de joc desitjada.",disabled:!r.isBloc2Enabled,value:r.modalitat,onChange:a=>l({...r,modalitat:a.target.value}),children:[e.jsx("option",{value:"",children:"-- Seleccioneu Modalitat --"}),e.jsx("option",{value:"Només Pista",children:"Només Pista (+0 €)"}),e.jsx("option",{value:"Només Volei Platja",children:"Només Volei Platja (+0 €)"}),e.jsx("option",{value:"Ambdós",children:"Ambdós (Pista + Platja) (+120 €)"})]})]}),e.jsxs("div",{className:"swing-field-group",children:[e.jsx("label",{children:"Equipació oficial completa:"}),e.jsxs("select",{className:"swing-input",title:"Indiqueu si desitja adquirir l'equipació oficial (SÍ/NO).",disabled:!r.isBloc2Enabled,value:r.equipacio,onChange:a=>l({...r,equipacio:a.target.value}),children:[e.jsx("option",{value:"",children:"-- Voleu Equipació? --"}),e.jsx("option",{value:"SÍ",children:"SÍ (+95 €)"}),e.jsx("option",{value:"NO",children:"NO (+0 €)"})]})]}),e.jsxs("div",{className:"swing-field-group",children:[e.jsx("label",{children:"Aportació / Donació (€):"}),e.jsx("input",{type:"text",title:"Quantitat voluntària en euros (0 si no desitja donar).",className:`swing-input ${r.hasDonacioError?"error":""}`,disabled:!r.isBloc2Enabled,value:r.donacio,onChange:a=>l({...r,donacio:a.target.value})})]}),e.jsxs("div",{style:{display:"flex",gap:"0.5rem",marginTop:"0.4rem"},children:[e.jsx("button",{type:"button",className:"swing-action-btn swing-btn-primary",style:{flex:1},disabled:!r.isBloc2Enabled,onClick:L,children:"CALCULAR"}),e.jsx("button",{type:"button",className:"swing-action-btn swing-btn-reset",style:{flex:1},disabled:!r.isBloc2Enabled,onClick:J,children:"ESBORRAR TOT"})]})]}),e.jsxs("div",{className:"swing-box",children:[e.jsx("div",{className:"swing-box-title",children:"Resultats (No editables)"}),e.jsxs("div",{className:"swing-field-group",style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("label",{style:{margin:0},children:"Preu Base (€):"}),e.jsx("input",{type:"text",readOnly:!0,className:"swing-input",style:{width:"55%",textAlign:"right",fontWeight:700},value:r.preuBase})]}),e.jsxs("div",{className:"swing-field-group",style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("label",{style:{margin:0},children:"IVA (21%) (€):"}),e.jsx("input",{type:"text",readOnly:!0,className:"swing-input",style:{width:"55%",textAlign:"right",fontWeight:700},value:r.iva})]}),e.jsxs("div",{className:"swing-field-group",style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("label",{style:{margin:0,fontWeight:900,color:"#1e293b"},children:"TOTAL (€):"}),e.jsx("input",{type:"text",readOnly:!0,className:"swing-input",style:{width:"55%",textAlign:"right",fontWeight:900,color:"#2563eb",fontSize:"1rem"},value:r.total})]})]}),e.jsxs("div",{className:"swing-box",children:[e.jsx("div",{className:"swing-box-title",children:"Errors i Alertes"}),e.jsxs("div",{className:`swing-alerts-panel ${r.alertaType==="error"?"has-error":r.alertaType==="success"?"is-ok":"is-empty"}`,children:[e.jsx("span",{children:r.alertaType==="error"?"⚠️":r.alertaType==="success"?"✓":"ℹ️"}),e.jsx("span",{children:r.alertaText||"No hi ha cap alerta activa."})]})]})]})]}),e.jsxs("div",{style:{marginTop:"2rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.4rem"},children:[e.jsxs("h3",{style:{fontSize:"1rem",color:"#0f172a",fontWeight:800,margin:0},children:["💻 Codi Font Oficial per a Eclipse: ",e.jsx("code",{children:"ClubVoleiFrame.java"})]}),e.jsx("button",{type:"button",className:"ent-copy-btn",onClick:()=>y(I,"swing-code"),children:j==="swing-code"?"✓ Copiat al porta-retalls!":"Copiar Codi Java"})]}),e.jsx("pre",{className:"ent-code-block",style:{maxHeight:"350px"},children:I})]}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem",marginTop:"1.5rem",flexWrap:"wrap",alignItems:"center"},children:[e.jsx("a",{href:"/eacs/ent/EAC2/exercici11.zip",download:!0,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.65rem 1.2rem",borderRadius:"8px",background:"#2563eb",color:"#ffffff",textDecoration:"none",fontWeight:800,fontSize:"0.9rem",boxShadow:"0 4px 14px rgba(37, 99, 235, 0.3)"},children:"📦 Descarregar exercici11.zip Llest per Lliurar"}),e.jsx("a",{href:"/eacs/ent/EAC2/src/cat/ioc/volei/ClubVoleiFrame.java",download:!0,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.65rem 1.2rem",borderRadius:"8px",background:"#ffffff",color:"#334155",textDecoration:"none",fontWeight:700,fontSize:"0.9rem",border:"1px solid #cbd5e1"},children:"📄 Descarregar ClubVoleiFrame.java"}),e.jsx("button",{type:"button",onClick:v,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.65rem 1.2rem",borderRadius:"8px",background:"#f8fafc",color:"#0f172a",fontWeight:700,fontSize:"0.9rem",border:"1px solid #cbd5e1",cursor:"pointer"},children:"📂 Obrir Carpeta de Resultats (Finder)"})]}),e.jsxs("div",{style:{marginTop:"1.5rem",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"10px",padding:"1.2rem"},children:[e.jsx("h4",{style:{margin:"0 0 0.8rem 0",color:"#0f172a",fontSize:"0.98rem",fontWeight:800},children:"🛠️ Guia Pas a Pas per a Realitzar l'Exercici a Eclipse:"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.6rem"},children:[e.jsxs("details",{style:{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"7px",padding:"0.65rem 0.9rem"},children:[e.jsxs("summary",{style:{cursor:"pointer",fontWeight:700,fontSize:"0.88rem",color:"#0f172a"},children:[e.jsx("span",{style:{color:"#2563eb",marginRight:"0.4rem"},children:"Pas 1:"})," Crear el Projecte Java a Eclipse"]}),e.jsxs("p",{style:{margin:"0.5rem 0 0 0",fontSize:"0.83rem",color:"#475569",lineHeight:1.5},children:["Ves al menú ",e.jsx("code",{children:"File → New → Java Project"}),". Posa-li com a nom ",e.jsx("code",{children:"Exercici11_Volei"}),". Utilitza Java SE 17 o 21 i ",e.jsx("strong",{children:"desmarca"})," la casella ",e.jsx("em",{children:"Create module-info.java"}),"."]})]}),e.jsxs("details",{style:{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"7px",padding:"0.65rem 0.9rem"},children:[e.jsxs("summary",{style:{cursor:"pointer",fontWeight:700,fontSize:"0.88rem",color:"#0f172a"},children:[e.jsx("span",{style:{color:"#2563eb",marginRight:"0.4rem"},children:"Pas 2:"})," Crear el JFrame amb WindowBuilder Pro"]}),e.jsxs("p",{style:{margin:"0.5rem 0 0 0",fontSize:"0.83rem",color:"#475569",lineHeight:1.5},children:["Fes clic dret sobre la carpeta ",e.jsx("code",{children:"src"})," → ",e.jsx("code",{children:"New → Other..."})," → carpeta ",e.jsx("code",{children:"WindowBuilder → Swing Designer → JFrame"}),". Posa com a Package ",e.jsx("code",{children:"cat.ioc.volei"})," i com a Name ",e.jsx("code",{children:"ClubVoleiFrame"}),"."]})]}),e.jsxs("details",{style:{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"7px",padding:"0.65rem 0.9rem"},children:[e.jsxs("summary",{style:{cursor:"pointer",fontWeight:700,fontSize:"0.88rem",color:"#0f172a"},children:[e.jsx("span",{style:{color:"#2563eb",marginRight:"0.4rem"},children:"Pas 3:"})," Títol Obligatori amb el Cognom i Tooltips"]}),e.jsxs("p",{style:{margin:"0.5rem 0 0 0",fontSize:"0.83rem",color:"#475569",lineHeight:1.5},children:["Al constructor de la finestra, estableix el títol oficial amb el teu cognom: ",e.jsx("code",{children:'setTitle("Simulador Quota Club Volei - deUna");'}),". Afegeix ",e.jsx("code",{children:'setToolTipText("...")'})," a tots els camps editables (edat, combos de selecció i aportació voluntària)."]})]}),e.jsxs("details",{style:{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"7px",padding:"0.65rem 0.9rem"},children:[e.jsxs("summary",{style:{cursor:"pointer",fontWeight:700,fontSize:"0.88rem",color:"#0f172a"},children:[e.jsx("span",{style:{color:"#2563eb",marginRight:"0.4rem"},children:"Pas 4:"})," Validacions, Gestió de Focus i Fórmules de Càlcul"]}),e.jsxs("p",{style:{margin:"0.5rem 0 0 0",fontSize:"0.83rem",color:"#475569",lineHeight:1.5},children:["En prémer ",e.jsx("strong",{children:"VALIDAR"}),": comprova enter positiu entre 6 i 99 anys i desplegables seleccionats. Si hi ha error, crida a ",e.jsx("code",{children:"camp.requestFocus()"})," i ",e.jsx("code",{children:"camp.selectAll()"})," per complir la rúbrica i mostra l'alerta. Si és correcte, deshabilita el bloc 1 i habilita el bloc 2.",e.jsx("br",{}),"En prémer ",e.jsx("strong",{children:"CALCULAR"}),": calcula Quota Categoria × Factor Tipus Soci + Suplements (Ambdós +120€, Equipació +95€, Donació) + IVA 21%."]})]}),e.jsxs("details",{style:{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"7px",padding:"0.65rem 0.9rem"},children:[e.jsxs("summary",{style:{cursor:"pointer",fontWeight:700,fontSize:"0.88rem",color:"#0f172a"},children:[e.jsx("span",{style:{color:"#2563eb",marginRight:"0.4rem"},children:"Pas 5:"})," Proves i Generació del Fitxer exercici11.zip"]}),e.jsxs("p",{style:{margin:"0.5rem 0 0 0",fontSize:"0.83rem",color:"#475569",lineHeight:1.5},children:["Executa la classe a Eclipse (",e.jsx("code",{children:"Run As → Java Application"}),"). Comprova que calcula correctament i que el botó ",e.jsx("em",{children:"ESBORRAR TOT"})," reinicialitza l'estat. Finalment, comprimeix la carpeta ",e.jsx("code",{children:"src"})," en ",e.jsx("code",{children:"exercici11.zip"})," (o fes servir el botó de descàrrega superior!)."]})]})]})]}),e.jsxs("div",{style:{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:"8px",padding:"1rem",marginTop:"1.2rem"},children:[e.jsx("h4",{style:{margin:"0 0 0.4rem 0",color:"#1d4ed8",fontSize:"0.9rem"},children:"📦 Lliurament d'aquest exercici:"}),e.jsxs("p",{style:{margin:0,fontSize:"0.82rem",color:"#334155"},children:["Comprimiu la carpeta ",e.jsx("code",{children:"src"})," del vostre projecte Eclipse en un fitxer anomenat ",e.jsx("strong",{children:e.jsx("code",{children:"exercici11.zip"})})," i afegiu-lo dins del zip general ",e.jsx("code",{children:"DA2_M0487_EAC2_DeUna_M.zip"}),"."]})]})]})}),d==="part-spring"&&e.jsxs("div",{className:"ent-task-card",children:[e.jsx("div",{className:"ent-task-header",children:e.jsxs("div",{children:[e.jsx("span",{className:"ent-task-badge",children:"Activitat 12 · 2.0 punts"}),e.jsx("h2",{style:{display:"inline",fontSize:"1.2rem",color:"#0f172a",fontWeight:800},children:"Aplicació Client-Servidor Spring a Tomcat (Quàdruple & DNI)"}),e.jsxs("p",{style:{margin:"0.5rem 0 0 0",color:"#64748b",fontSize:"0.85rem"},children:["Requeriments personals del professorat: calcular el ",e.jsx("strong",{children:"quàdruple (x4)"})," del valor introduït (en comptes del doble x2) i col·locar el ",e.jsx("strong",{children:"DNI de Blanca"})," a sota del títol i abans del resultat."]})]})}),e.jsxs("div",{style:{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"8px",padding:"1rem",marginBottom:"1.5rem"},children:[e.jsx("h4",{style:{margin:"0 0 0.4rem 0",color:"#b91c1c",fontSize:"0.9rem"},children:"⚠️ Resolució d'incidència típica: Port 8080 ocupat"}),e.jsxs("p",{style:{margin:"0 0 0.5rem 0",fontSize:"0.82rem",color:"#475569"},children:["Si en engegar Spring Boot apareix ",e.jsx("em",{children:'"Web server failed to start. Port 8080 was already in use"'}),", executeu a la terminal:"]}),e.jsxs("pre",{style:{background:"#0f172a",padding:"0.6rem",borderRadius:"4px",fontSize:"0.8rem",color:"#38bdf8",margin:0},children:["sudo netstat -lnp | grep 8080   # identifica el PID (ex: 4199)",`
`,"sudo kill -9 4199               # finalitza el procés que ocupa el port"]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.4rem"},children:[e.jsxs("h3",{style:{fontSize:"1rem",color:"#0f172a",fontWeight:800,margin:0},children:["💻 Codi Java: ",e.jsx("code",{children:"com.exemple.web.servidor.Controlador.java"})]}),e.jsx("button",{type:"button",className:"ent-copy-btn",onClick:()=>y(R,"spring-code"),children:j==="spring-code"?"✓ Copiat al porta-retalls!":"Copiar Codi Spring"})]}),e.jsx("pre",{className:"ent-code-block",style:{maxHeight:"350px"},children:R})]}),e.jsxs("div",{style:{marginTop:"1.5rem"},children:[e.jsxs("h3",{style:{fontSize:"0.95rem",color:"#34d399",fontWeight:800,marginBottom:"0.6rem"},children:["📸 Previsualització de la Captura Oficial Requerida: ",e.jsx("code",{children:"exercici12.jpg"})]}),e.jsxs("div",{style:{background:"#ffffff",color:"#000000",padding:"1.5rem",borderRadius:"8px",border:"2px solid #cbd5e1",maxWidth:"600px"},children:[e.jsx("h1",{style:{fontSize:"1.5rem",margin:"0 0 0.5rem 0"},children:"Calcula el quàdruple del valor"}),e.jsx("p",{style:{color:"#2563eb",fontWeight:"bold",margin:"0 0 1rem 0"},children:"Alumna: Blanca de Uña Martín · DNI: 12345678Z (DNI fictici - Art. 5.1.c RGPD)"}),e.jsx("h2",{style:{color:"#059669",fontSize:"1.3rem",margin:"0 0 0.5rem 0"},children:"Resultat: 48"}),e.jsx("p",{style:{color:"#475569",fontSize:"0.9rem",margin:0},children:"(Valor introduït: 12 × 4 = 48)"})]})]}),e.jsxs("div",{style:{background:"linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",border:"2px solid #3b82f6",borderRadius:"10px",padding:"1.2rem",marginTop:"1.5rem",boxShadow:"0 4px 12px rgba(59, 130, 246, 0.08)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.6rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx("span",{style:{fontSize:"1.2rem"},children:"📬"}),e.jsx("h4",{style:{margin:0,color:"#1e40af",fontSize:"0.98rem",fontWeight:800},children:"Pendent per a demà: Enviar correu a la Montse (DNI Fictici & RGPD)"})]}),e.jsx("button",{type:"button",className:"ent-copy-btn",onClick:()=>y(`Assumpte: M0487 Entorns de Desenvolupament - Consulta sobre l'EAC 2 i protecció de dades (RGPD)

Bon dia, Montse,

Em poso en contacte amb tu en relació amb el desenvolupament de l'EAC 2 (Desenvolupament de programari), en la qual estic treballant actualment.

En abordar l'Activitat 12 (Spring Boot), on l'enunciat demana fer constar el DNI de l'alumnat a la pantalla web, t'informo que inclouré el meu nom complet però utilitzaré un DNI fictici estàndard (12345678Z).

D'acord amb el RGPD (Reglament UE 2016/679, Art. 5.1.c - Principi de minimització de dades) i la LOPDGDD 3/2018, la recollida i exposició d'una dada d'identificació personal com el DNI real dins d'exercicis avaluables, codi font o captures al Moodle no és legal ni procedent, atès que aquesta dada només pot ser tractada pels serveis de secretaria per a la formalització de la matrícula i la gestió d'expedients oficials. En l'àmbit docent i formatiu, la normativa exigeix l'ús exclusiu de dades fictícies o anonimitzades.

Si necessites contrastar aquest criteri o requereixes confirmació institucional sobre la improcedència de sol·licitar DNIs reals a les activitats d'avaluació contínua, pots consultar-ho directament amb el Delegat de Protecció de Dades de l'IOC mitjançant el seu correu oficial: dpd@ioc.cat.

D'aquesta manera, l'activitat acreditarà amb total claredat l'autoria del meu treball mantenint la privacitat protegida d'acord amb la legislació vigent.

Moltes gràcies per la teva atenció.

Cordialment,
Blanca de Uña Martín
Alumna de DAW - Institut Obert de Catalunya`,"email-montse"),children:j==="email-montse"?"✓ Correu copiat!":"📋 Copiar Borrador de Correu"})]}),e.jsx("p",{style:{margin:"0 0 0.8rem 0",fontSize:"0.84rem",color:"#334155",lineHeight:1.5},children:"Recorda enviar aquest missatge des del correu del Moodle abans de fer el lliurament final perquè quedi constància oficial del teu criteri legal."}),e.jsxs("div",{style:{background:"#ffffff",border:"1px solid #bfdbfe",borderRadius:"6px",padding:"0.9rem",fontSize:"0.8rem",color:"#1e293b",whiteSpace:"pre-wrap",lineHeight:1.5,maxHeight:"200px",overflowY:"auto"},children:[e.jsx("strong",{children:"Assumpte:"})," M0487 Entorns de Desenvolupament - Consulta sobre l'EAC 2 i protecció de dades (RGPD)",`

`,"Bon dia, Montse,",`

`,"Em poso en contacte amb tu en relació amb el desenvolupament de l'EAC 2 (Desenvolupament de programari), en la qual estic treballant actualment...",`

`,"En abordar l'Activitat 12 (Spring Boot), on l'enunciat demana fer constar el DNI de l'alumnat a la pantalla web, t'informo que inclouré el meu nom complet però utilitzaré un DNI fictici estàndard (12345678Z)...",`

`,"D'acord amb el RGPD (Art. 5.1.c) i la LOPDGDD 3/2018... delegat DPD oficial: dpd@ioc.cat."]}),e.jsx("div",{style:{marginTop:"0.8rem",display:"flex",gap:"0.8rem"},children:e.jsx("a",{href:"https://ioc.xtec.cat/campus/local/mail/view.php?t=drafts&c=18646&m=9380631",target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"0.4rem",fontSize:"0.82rem",color:"#2563eb",fontWeight:700,textDecoration:"none"},children:"🔗 Obrir la bústia de correu de la Montse al Moodle →"})})]}),e.jsxs("div",{style:{background:"rgba(59, 130, 246, 0.1)",border:"1px solid rgba(59, 130, 246, 0.3)",borderRadius:"8px",padding:"1rem",marginTop:"1.5rem"},children:[e.jsx("h4",{style:{margin:"0 0 0.4rem 0",color:"#60a5fa",fontSize:"0.9rem"},children:"📦 Lliurament d'aquest exercici:"}),e.jsxs("p",{style:{margin:0,fontSize:"0.82rem",color:"#cbd5e1"},children:["Desa la captura com a ",e.jsx("strong",{children:e.jsx("code",{children:"exercici12.jpg"})}),". Comprimeix-la juntament amb la carpeta ",e.jsx("code",{children:"src"})," del teu projecte Spring en un fitxer anomenat ",e.jsx("strong",{children:e.jsx("code",{children:"exercici12.zip"})})," i afegeix-lo al zip principal."]})]})]}),d==="part-copilot"&&e.jsxs("div",{className:"ent-task-card",children:[e.jsx("div",{className:"ent-task-header",children:e.jsxs("div",{children:[e.jsx("span",{className:"ent-task-badge",children:"Activitat 13 · 1.0 punt"}),e.jsx("h2",{style:{display:"inline",fontSize:"1.2rem",color:"#0f172a",fontWeight:800},children:"Assistent IA GitHub Copilot a Eclipse"}),e.jsx("p",{style:{margin:"0.5rem 0 0 0",color:"#64748b",fontSize:"0.85rem"},children:"Instal·lació des d'Eclipse Marketplace, implementació de 2 mètodes estàtics (ocultació de vocals amb accents i comptador de paraules) i respostes de reflexió sobre l'assistent."})]})}),e.jsxs("div",{style:{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"8px",padding:"1.1rem",marginBottom:"1.2rem"},children:[e.jsx("h4",{style:{margin:"0 0 0.4rem 0",color:"#7c3aed",fontSize:"0.9rem"},children:"Pas A: Instal·lació a Eclipse Marketplace"}),e.jsxs("ol",{style:{margin:0,paddingLeft:"1.2rem",fontSize:"0.85rem",color:"#334155",lineHeight:"1.6"},children:[e.jsxs("li",{children:["Menú d'Eclipse: ",e.jsx("code",{children:"Help → Eclipse Marketplace..."})]}),e.jsxs("li",{children:["Cercar: ",e.jsx("code",{children:"GitHub Copilot"}),", fer clic a ",e.jsx("strong",{children:"Install"})," i confirmar dependències i llicències."]}),e.jsx("li",{children:"Reiniciar Eclipse quan ho sol·liciti l'entorn."}),e.jsxs("li",{children:["A la vista ",e.jsx("strong",{children:"Copilot Chat"}),", iniciar sessió amb el compte de GitHub (el pla gratuït inclou fins a 2000 suggeriments al mes)."]})]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.4rem"},children:[e.jsxs("h3",{style:{fontSize:"1rem",color:"#0f172a",fontWeight:800,margin:0},children:["💻 Codi Java: ",e.jsx("code",{children:"cat.ioc.copilot.CopilotAssistent.java"})]}),e.jsx("button",{type:"button",className:"ent-copy-btn",onClick:()=>y(q,"copilot-code"),children:j==="copilot-code"?"✓ Copiat al porta-retalls!":"Copiar Codi Copilot"})]}),e.jsx("pre",{className:"ent-code-block",style:{maxHeight:"350px"},children:q})]}),e.jsxs("div",{style:{marginTop:"1.5rem",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"8px",padding:"1.3rem"},children:[e.jsx("h3",{style:{fontSize:"1rem",color:"#0284c7",fontWeight:800,margin:"0 0 0.8rem 0"},children:"📝 Respostes per a l'apartat 13 del document .odt:"}),e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsx("strong",{style:{color:"#0f172a",fontSize:"0.88rem"},children:"1. Què heu escrit vosaltres i què ha suggerit Copilot?"}),e.jsxs("p",{style:{margin:"0.3rem 0 0 0",fontSize:"0.83rem",color:"#334155",lineHeight:"1.6"},children:[e.jsx("em",{children:"Mètode 1 (Vocals):"})," He escrit la capçalera del mètode ",e.jsx("code",{children:"public static String ocultarVocals(String text)"})," i el comentari explicant la substitució de vocals incloent les accentuades. Copilot ha suggerit automàticament l'expressió regular ",e.jsx("code",{children:'text.replaceAll("(?i)[aeiouàèéíòóúïü]", "*")'})," i la comprovació prèvia de nuls.",e.jsx("br",{}),e.jsx("em",{children:"Mètode 2 (Paraules):"})," He definit ",e.jsx("code",{children:"public static int comptarParaules(String text)"})," i Copilot ha generat el control de text buit o nul amb ",e.jsx("code",{children:"trim().isEmpty()"})," i la divisió per espais en blanc múltiples utilitzant ",e.jsx("code",{children:'split("\\\\s+")'})," retornant la mida de l'array resultant."]})]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#0f172a",fontSize:"0.88rem"},children:"2. Trobeu que us ha estalviat feina? Ha estat fàcil utilitzar l'assistent?"}),e.jsx("p",{style:{margin:"0.3rem 0 0 0",fontSize:"0.83rem",color:"#334155",lineHeight:"1.6"},children:"Sí, ha estalviat notablement el temps de desenvolupament, especialment en redactar d'un sol cop la regex exhaustiva de caràcters accentuats en català/castellà i en contemplar els casos límit (cadenes nul·les o amb espais repetits). La integració a Eclipse ha estat molt intuïtiva gràcies a la tecla Tab per acceptar suggeriments en línia i la barra lateral de xat."})]})]})]})]}):e.jsxs("div",{className:"ent-paper-mode-wrapper",children:[e.jsxs("div",{className:"ent-paper-action-bar no-print",children:[e.jsxs("div",{className:"ent-paper-action-info",children:[e.jsx("span",{className:"ent-paper-action-icon",children:"📄"}),e.jsxs("div",{children:[e.jsx("div",{className:"ent-paper-action-title",children:"Format oficial IOC preparat per a impressió o exportació a PDF"}),e.jsx("div",{className:"ent-paper-action-desc",children:"Pots desar el document complet en PDF oficial o enviar-lo a la impressora prement aquest botó o amb Cmd + P."})]})]}),e.jsxs("button",{type:"button",className:"ent-paper-print-trigger-btn",onClick:()=>window.print(),children:[e.jsx("span",{children:"🖨️"}),e.jsx("span",{children:"Generar / Imprimir PDF Oficial"})]})]}),e.jsxs("div",{className:"ent-paper-sheet",children:[e.jsxs("div",{className:"ent-paper-header",children:[e.jsx("div",{style:{fontSize:"0.85rem",color:"#64748b",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"},children:"Institut Obert de Catalunya · CFGS Desenvolupament d'Aplicacions Web / Multiplataforma"}),e.jsx("h1",{style:{margin:"0.4rem 0 0.2rem 0",fontSize:"1.7rem",color:"#0f172a"},children:"Solució EAC 2: Desenvolupament de programari"}),e.jsx("div",{style:{fontSize:"1rem",color:"#0284c7",fontWeight:700},children:"Mòdul 0487 – Entorns de Desenvolupament · Curs 2026-27 (1r semestre)"})]}),e.jsx("table",{className:"ent-paper-meta-table",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"label",children:"Estudiant:"}),e.jsx("td",{children:e.jsx("strong",{children:"Blanca de Uña Martín"})}),e.jsx("td",{className:"label",children:"Correu Oficial:"}),e.jsx("td",{children:"bdeunam@ioc.cat"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"label",children:"Nom Fitxer ODT:"}),e.jsx("td",{children:e.jsx("code",{children:"DA2_M0487_EAC2_DeUna_M.odt"})}),e.jsx("td",{className:"label",children:"Nom Fitxer ZIP:"}),e.jsx("td",{children:e.jsx("code",{children:"DA2_M0487_EAC2_DeUna_M.zip"})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"label",children:"Termini de Lliurament:"}),e.jsx("td",{colSpan:"3",children:"17 de novembre de 2026 a les 23:55 h"})]})]})}),e.jsx("h2",{style:{fontSize:"1.25rem",color:"#0369a1",borderBottom:"1px solid #e2e8f0",paddingBottom:"0.4rem",marginTop:"2rem"},children:"Apartat 1: Desenvolupament de programari (2 punts)"}),e.jsx("p",{style:{fontSize:"0.9rem",color:"#475569"},children:"Taula de respostes corresponent a les 10 preguntes d'opció múltiple del material d'estudi:"}),e.jsxs("table",{className:"ent-answers-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:g.map(a=>e.jsx("th",{children:a.num},a.num))})}),e.jsx("tbody",{children:e.jsx("tr",{children:g.map(a=>{const s=b[a.num];return e.jsx("td",{children:s?s.toUpperCase():"A"},a.num)})})})]}),e.jsx("h2",{style:{fontSize:"1.25rem",color:"#0369a1",borderBottom:"1px solid #e2e8f0",paddingBottom:"0.4rem",marginTop:"2.5rem"},children:"Apartat 2: Pregunta 13 (GitHub Copilot · 1 punt)"}),e.jsxs("p",{style:{fontSize:"0.9rem",color:"#475569"},children:["Captura de pantalla de la classe resultant ",e.jsx("code",{children:"CopilotAssistent.java"})," amb els comentaris ",e.jsx("code",{children:"/* */"}),":"]}),e.jsxs("div",{className:"ent-paper-box-screenshot",children:[e.jsx("div",{style:{color:"#0284c7",fontSize:"1.6rem",marginBottom:"0.5rem"},children:"🖼️"}),e.jsx("div",{style:{fontWeight:700,color:"#334155"},children:"[Espai reservat per a la Captura d'Eclipse amb la classe CopilotAssistent.java]"}),e.jsx("div",{style:{fontSize:"0.8rem",color:"#64748b",marginTop:"0.3rem"},children:"Mostrant els dos mètodes estàtics i els comentaris javadoc descriptius."})]}),e.jsx("h3",{style:{fontSize:"1rem",color:"#1e293b",marginTop:"1.5rem",marginBottom:"0.5rem"},children:"Respostes a les qüestions:"}),e.jsxs("div",{style:{fontSize:"0.9rem",color:"#334155",lineHeight:"1.6"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Per a cadascun dels mètodes: què heu escrit vosaltres i què ha suggerit CoPilot?"}),e.jsx("br",{}),"A l'activitat he definit les capçaleres formals dels dos mètodes estàtics (",e.jsx("code",{children:"ocultarVocals"})," i ",e.jsx("code",{children:"comptarParaules"}),") acompanyats d'un comentari en llenguatge natural explicant l'objectiu i els exemples de l'enunciat. A continuació, GitHub Copilot ha completat íntegrament els cossos dels mètodes: per al primer ha generat l'expressió regular ",e.jsx("code",{children:"(?i)[aeiouàèéíòóúïü]"})," amb substitució per ",e.jsx("code",{children:'"*"'})," i la validació de cadenes nul·les; per al segon, ha suggerit la neteja d'espais extrems amb ",e.jsx("code",{children:"trim()"}),", la verificació de cadena buida i el particionat mitjançant ",e.jsx("code",{children:'split("\\\\s+")'}),"."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Trobeu que us ha estalviat feina? Ha estat fàcil utilitzar l'assistent?"}),e.jsx("br",{}),"Sí, l'estalvi de temps ha estat molt evident, sobretot en no haver d'escriure manualment el conjunt complet de caràcters accentuats catalans ni dissenyar la lògica de comprovació d'espais múltiples des de zero. La integració a través de l'Eclipse Marketplace és senzilla i el flux de treball resulta molt àgil acceptant suggeriments amb la tecla de tabulació."]})]}),e.jsxs("div",{style:{marginTop:"2.5rem",background:"#f8fafc",border:"1px solid #cbd5e1",borderRadius:"6px",padding:"1.2rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.8rem",marginBottom:"0.6rem"},children:[e.jsxs("h4",{style:{margin:0,color:"#0369a1",fontSize:"0.95rem"},children:["📁 Estructura del fitxer comprimit final: ",e.jsx("code",{children:"DA2_M0487_EAC2_DeUna_M.zip"})]}),e.jsx("button",{type:"button",onClick:v,style:{display:"inline-flex",alignItems:"center",gap:"0.4rem",padding:"0.4rem 0.8rem",borderRadius:"6px",border:"1px solid #93c5fd",background:"#eff6ff",color:"#1d4ed8",fontSize:"0.82rem",fontWeight:700,cursor:"pointer"},children:"📂 Obrir Carpeta al Finder"})]}),e.jsxs("ul",{style:{margin:0,paddingLeft:"1.3rem",fontSize:"0.85rem",color:"#475569",lineHeight:"1.5"},children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"DA2_M0487_EAC2_DeUna_M.odt"})}),": Aquest document amb el test i la pregunta 13 (sense enunciats innecessaris)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"exercici11.zip"})}),": Carpeta ",e.jsx("code",{children:"src"})," del projecte Swing WindowBuilder (quota de volei)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"exercici12.zip"})}),": Carpeta ",e.jsx("code",{children:"src"})," del projecte Spring Boot + captura ",e.jsx("code",{children:"exercici12.jpg"})," (quàdruple i DNI)."]})]})]})]})]})]}),T&&e.jsxs("div",{className:"ent-toast-notification",children:[e.jsx("span",{children:T}),e.jsx("button",{type:"button",onClick:()=>p(null),style:{background:"transparent",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:"1rem",padding:0},children:"✕"})]})]})}export{q as COPILOT_JAVA_CODE,I as JAVA_SWING_CODE,R as SPRING_CODE,H as default};
