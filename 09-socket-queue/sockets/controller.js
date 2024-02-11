const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // Cuando un cliente se conecta
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('current-status', ticketControl.lastfour);
    socket.emit('outstanding-tickets', ticketControl.tickets.length);


    socket.on('next-ticket', ( payload, callback ) => {
        
        const next = ticketControl.next();
        callback( next );
        socket.broadcast.emit('outstanding-tickets', ticketControl.tickets.length);

    });

    socket.on('attend-ticket', ({ desk }, callback) => {

        if (!desk) {
            return callback({
                ok: false,
                msg: 'El escritorio es necesario'
            });
        }

        const ticket = ticketControl.attendTicket( desk );

        socket.broadcast.emit('current-status', ticketControl.lastfour);
        socket.emit('outstanding-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('outstanding-tickets', ticketControl.tickets.length);

        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }

    });
}



module.exports = {
    socketController
}

