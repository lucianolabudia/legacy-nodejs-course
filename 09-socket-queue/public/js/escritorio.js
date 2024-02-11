// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');  
}

const desk = searchParams.get('escritorio');
lblEscritorio.innerText = desk;

divAlerta.style.display = 'none';

const socket = io();


socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('outstanding-tickets', ( earrings ) => {
    if ( earrings === 0 ) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = earrings;
    }
});

btnAtender.addEventListener( 'click', () => {

    socket.emit( 'attend-ticket', { desk }, ( {ok, ticket, msg} ) => {
        
        if ( !ok ) {
            lblTicket.innerText = 'Nadie.';
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = 'Ticket ' + ticket.number;

    });
    // socket.emit( 'next-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});