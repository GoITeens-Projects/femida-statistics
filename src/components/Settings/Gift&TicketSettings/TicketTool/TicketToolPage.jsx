// import { Table, Button } from 'rsuite';
// import 'rsuite/Table/styles/index.css';
import s from './TicketTool.module.css';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../../../../redux/ticketTool/operation';
import { selectTickets, selectCurrentPage } from '../../../../redux/ticketTool/selectors';
import { Button } from 'rsuite';
import deleteIcon from '../../../../img/svgs/delete.svg'
import Shadow from '../../../Shadow/Shadow';
import MessageBubbleExample from '../../../MessageBubble/MessageBubbleExample';
import {ChatBox} from './ChatBox';
import {getTicketById} from '../../../../redux/ticketTool/operation';
//  import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "components/ui/table"


export const TicketToolPage = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(selectTickets);
  const currentPage = useSelector(selectCurrentPage);
  const [selectedTicked, setSelectedTicket] = useState(null);

  useEffect(() => {
    console.log('TicketToolPage render');
    dispatch(fetchTickets(currentPage));
  }, [dispatch]);

// const { Column, HeaderCell, Cell } = Table;
const data = [
    {name: 'name', date:'date', status:'status', createAt:'324234'},
   {name: 'name', date:'date', status:'status', createAt:'324234'},
    {name: 'name', date:'date', status:'status', createAt:'324234'},
];

console.log('tickets', tickets[currentPage]);

const ticketsData = tickets[currentPage].map(ticket => {
console.log('ticket', ticket.createAt);
  return{
  avatar: ticket.opener.avatar,
  id: ticket.id,
  name: `ticket-${ticket.name}`,
  opener: ticket.opener.username,
  createAt: ticket.createAt,
  
}});

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const columns = [
   { name: "", cell: row => <img src={row.avatar} alt={row.name} className={s.avatar}/>, maxWidth: '3em', 
  //  conditionalCellStyles: [
	// 		{
	// 			when: row => true,
	// 			style: {
	// 				maxWidth: '3em',
	// 			},
	// 		}, ]
   },
  { name: "Назва конфігурації", selector: row => row.name, 
   },
  { name: "Дата створення", selector: row => row.createAt,  conditionalCellStyles: [
			{
				when: row => row.createAt === "Paid",
				style: {
					backgroundColor: 'rgba(63, 195, 128, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, ]},
  { name: "Створено", selector: row => row.opener },
  { name: "Дії", selector: row => <Button className={s.deleteButton}><img src={deleteIcon} alt="Delete"/></Button>, maxWidth: '5em', center: true,},
]

const customStyles = {
  headRow: {
    style:{
      fontSize: '1.25em',
      color: `var(--text-accent-color)`,
       backgroundColor: 'var(--bg-modal-color)',
    }
  },
rows:{
  style:{
    fontSize: '1.25em',
    color: `var(--text-color)`,
    backgroundColor: 'var(--bg-modal-color)',
    onRowHover: (row) => ({backgroundColor: 'var(--gift-background)'}),
    
    // backgroundColor:`${(row) => {
    //   console.log('row',row);
    //   return 'green'
    // }}`,
  }
}}
    return<>
        <h1>Ticket-Tool</h1>
        <div className={s.baseContainer}>
   <Shadow
                leftFirst={-7}
                widthFirst={5}
                heightSecond={5}
                rightSecond={3}
                bottomSecond={-7}
                backgroundBoth={'var(--shadow-secondary-border)'}
                borderColorBoth={'#558DB2'}
              />
<DataTable columns={columns} data={ticketsData} customStyles={customStyles} highlightOnHover={true}  onRowClicked ={(row, e) => {
      setSelectedTicket(row.id)
  dispatch(
getTicketById(row.id)
       )
       console.log('getTicketById', row.id);
    }}/>
</div>

<div className={s.baseContainer}>
   <Shadow
                leftFirst={-7}
                widthFirst={5}
                heightSecond={5}
                rightSecond={3}
                bottomSecond={-7}
                backgroundBoth={'var(--shadow-secondary-border)'}
                borderColorBoth={'#558DB2'}
              />
              {selectedTicked && <ChatBox ticketId={selectedTicked} />}

</div>

   </>
    
}