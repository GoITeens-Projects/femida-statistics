// import { Table, Button } from 'rsuite';
// import 'rsuite/Table/styles/index.css';
import s from './TicketTool.module.css';
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../../../../redux/ticketTool/operation';
import { selectTickets, selectCurrentPage } from '../../../../redux/ticketTool/selectors';
import { Button } from 'rsuite';
import deleteIcon from '../../../../img/svgs/delete.svg'
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
      
    }
  },
rows:{
  style:{
    fontSize: '1.25em',
    color: `var(--text-color)`,
    // backgroundColor:`${(row) => {
    //   console.log('row',row);
    //   return 'green'
    // }}`,
  }
}}
    return<>
        <h1>Ticket-Tool</h1>

<DataTable columns={columns} data={ticketsData} customStyles={customStyles}/>


    {/* <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table> */}


          {/* <Table
      height={400}
      width='73%'
      data={data}
      onRowClick={rowData => {
        console.log(rowData);
      }}
      rowClassName={(_, rowIndex) => {
        return rowIndex % 2 === 0 ? s.first : s.second;
      }}
    ><Column width='0.625em' align="center" fixed>
 <HeaderCell> </HeaderCell>
        <Cell dataKey="number">  {(rowData, rowIndex) => rowIndex + 1 }</Cell>
      </Column>

      <Column width='6.75em' align="center" fixed>
        <HeaderCell>Назва конфігурації</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width='5.25em'>
        <HeaderCell>Дата створення</HeaderCell>
        <Cell dataKey="date" />
      </Column>

      <Column width='5.25em'>
        <HeaderCell>Статус</HeaderCell>
        <Cell dataKey="status" />
      </Column>

      <Column width='8.1875em'>
        <HeaderCell>Створено</HeaderCell>
        <Cell dataKey="createAt" />
      </Column>

      <Column width='1.25em' fixed="right">
        <HeaderCell>Дії</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
            <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
              Edit
            </Button>
          )}
        </Cell>
      </Column>
    </Table> */}
  
        </>
    
}