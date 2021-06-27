import React, { useEffect, useState } from 'react';
import "./remoteMatch.css";

export const RemoteMatch = () => {
    const cruz = "Cruz";
    const circulo = "Circulo";
    var inicial = [["", "", ""], ["", "", ""], ["", "", ""]];
    const [tablero, setTablero] = useState(inicial);
    const [ganador, setGanador] = useState("");
    const [empate, setEmpate] = useState(false);
    const [turno, setTurno] = useState(cruz);
    const [ficha, setFicha] = useState("");
    const [estado, setEstado] = useState("desconectado");
    const [idDelJuego, setIdJuego] = useState("");
    const [socket, setSocket] = useState(null);

    const verificarGanador = () => {
        if (!ganador && !empate) {
            var nuevoGanador = "";
            for (var i = 0; i < 3 && !nuevoGanador; i++) {
                if (tablero[i][0] && tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) {
                    nuevoGanador = tablero[i][0];
                }
                else if (tablero[0][i] && tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) {
                    nuevoGanador = tablero[0][i];
                }
            };
            if (tablero[0][0] && tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) {
                nuevoGanador = tablero[0][0];
            }
            else if (tablero[0][2] && tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) {
                nuevoGanador = tablero[0][2];
            }
            if (nuevoGanador) {
                setGanador(nuevoGanador);
            }
            else {
                var draw = true;
                for (var f = 0; f < 3 && draw; f++) {
                    for (var c = 0; c < 3 && draw; c++) {
                        draw = draw && tablero[f][c];
                    };
                };
                if (draw) {
                    setEmpate(true);
                }
            }
        }
    }


    const cambioDeTurno = (fila, columna, e) => {
        e.preventDefault();

        if (ficha === turno && tablero[fila][columna] === "" && !ganador && !empate) {
            var temp = [["", "", ""], ["", "", ""], ["", "", ""]];
            for (var i = 0; i < 3; i++) {
                for (var c = 0; c < 3; c++) {
                    temp[i][c] = tablero[i][c];
                };
            };
            temp[fila][columna] = turno;
            setTablero(temp);
            if (turno === cruz) {
                setTurno(circulo)
            }
            else if (turno === circulo) {
                setTurno(cruz)
            }
            if (socket) {
                var msgRespuesta = {
                    idJuego: idDelJuego,
                    tablero: temp,
                    turno: ficha
                };
                socket.send(JSON.stringify(msgRespuesta));
            }

        };

    }

    useEffect(verificarGanador, [empate, ganador, tablero]);

    const buscarEncuentro = () => {
        setEstado("buscando");
        var ws = new WebSocket("ws://localhost:3001");

        ws.onmessage = (msg) => {
            var mensaje = JSON.parse(msg.data);
            var tipo = mensaje.tipo;
            if (tipo === "espera") {

            }
            else if (tipo === "inicio") {
                setEstado("jugando");
                setFicha(mensaje.ficha);
                setIdJuego(mensaje.idJuego)
                setTurno(cruz);
            }
            else if (tipo === "movimiento") {
                setTablero(mensaje.tablero);
                setTurno(mensaje.turno);
            }
            else if (tipo === "terminacion") {
                setEstado("terminado");
                if (mensaje.resultado === "empate") {
                    setTablero(mensaje.tablero);
                    setEmpate(true);

                }
                else if (mensaje.resultado === "victoria") {
                    setTablero(mensaje.tablero);
                    setGanador(mensaje.ganador);
                }
            }
        };
        setSocket(ws);
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5 turn">
                        <h1 className="heading-section">Es el turno de {turno}</h1>
                        <h1 className="heading-section" style={{ display: ficha ? 'block' : 'none' }}>Tu ficha es {ficha}</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto text-center mb-5">
                        <table className="table table-bordered-black tablero">
                            <tbody>
                                {inicial.map((fila, numFila) => <tr className="casilla">{fila.map((columna, numColumna) => <th onClick={(e) => cambioDeTurno(numFila, numColumna, e)}><img
                                    src="./cruz.png"
                                    alt="cruz"
                                    style={{ display: tablero[numFila][numColumna] === cruz ? 'inline-block' : 'none' }}
                                /><img
                                        src="./circulo.png"
                                        alt="circulo"
                                        style={{ display: tablero[numFila][numColumna] === circulo ? 'inline-block' : 'none' }}
                                    /></th>)}</tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5 turn">
                        <h2 className="heading-section" style={{ display: ganador ? 'block' : 'none' }}>El ganador es {ganador}</h2>
                        <h2 className="heading-section" style={{ display: empate ? 'block' : 'none' }}>No es posible hacer mas jugadas el juego termina en empate</h2>
                        <button style={{ display: estado === "desconectado" ? 'inline-block' : 'none' }} type="button" className="btn btn-primary" onClick={buscarEncuentro}>Buscar partida</button>
                        <h2 className="heading-section" style={{ display: estado === "buscando" ? 'block' : 'none' }}>Buscando contrincante</h2>
                    </div>
                </div>
            </div>
        </>
    );
};
