import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4', // light background color
  },
  tableWrapper: {
    width: '80%', // reduce the table width
    maxWidth: '800px', // set a max width for large screens
    margin: '20px 0', // add margin for spacing
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff', // background for the table wrapper
    marginBottom: '400px',
  },
  table: {
    minWidth: 500,
    borderCollapse: 'collapse',
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#3f51b5',
    color: 'white',
    fontWeight: 'bold',
  },
  tablecell: {
    fontSize: '14px',
    padding: '12px 16px', // add padding to cells
    textAlign: 'center', // center-align text in each cell
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f1f1f1', // add hover effect to rows
    },
  },
  noData: {
    textAlign: 'center',
    padding: '20px',
    color: '#555',
  },
});

const Invoices = () => {
  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('http://localhost:5000/invoices');
        const data = await response.json();
        
        if (Array.isArray(data.data)) {
          setInvoices(data.data);
        } else {
          console.error('Fetched data is not an array:', data);
          setInvoices([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const openInvoice = (id) => {
    history.push(`/invoice/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.tableWrapper}>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.header} style={{ width: '30%' }}>
                  Client
                </TableCell>
                <TableCell className={classes.header} style={{ width: '20%' }}>
                  Amount
                </TableCell>
                <TableCell className={classes.header} style={{ width: '20%' }}>
                  Due Date
                </TableCell>
                <TableCell className={classes.header} style={{ width: '30%' }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className={classes.noData}>
                    No invoices available.
                  </TableCell>
                </TableRow>
              ) : (
                invoices.map((invoice) => (
                  <TableRow
                    key={invoice._id}
                    className={classes.row}
                    onClick={() => openInvoice(invoice._id)}
                  >
                    <TableCell className={classes.tablecell}>{invoice.client?.name}</TableCell>
                    <TableCell className={classes.tablecell}>
                      {invoice.currency} {invoice.total}
                    </TableCell>
                    <TableCell className={classes.tablecell}>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={classes.tablecell}>{invoice.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Invoices;
