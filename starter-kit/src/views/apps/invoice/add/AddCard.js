// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <TextField size='small' inputRef={ref} sx={{ width: { sm: '250px', xs: '170px' } }} {...props} />
})

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  '&:not(:last-child)': {
    paddingRight: `${theme.spacing(2)} !important`
  }
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-2.25rem',
    position: 'absolute'
  },
  [theme.breakpoints.down('md')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(16, 10, 10),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(10)
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6)
  }
}))

const InvoiceAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const CustomSelectItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.success.main,
  backgroundColor: 'transparent !important',
  '&:hover': {
    color: `${theme.palette.success.main} !important`,
    backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important`
  },
  '&.Mui-focusVisible': {
    backgroundColor: `${alpha(theme.palette.success.main, 0.2)} !important`
  },
  '&.Mui-selected': {
    color: `${theme.palette.success.contrastText} !important`,
    backgroundColor: `${theme.palette.success.main} !important`,
    '&.Mui-focusVisible': {
      backgroundColor: `${theme.palette.success.dark} !important`
    }
  }
}))
const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const AddCard = () => {
  // ** Props
  // const { clients, invoiceNumber, selectedClient, setSelectedClient, toggleAddCustomerDrawer } = props

  // ** States
  const [count, setCount] = useState(1)
  const [selected, setSelected] = useState('')
  const [issueDate, setIssueDate] = useState(new Date())
  const [dueDate, setDueDate] = useState(new Date(tomorrowDate))


  const [entreprise, setEntreprise] = useState('')
  const [factures, setFactures] = useState('')
  const [clients, setClients] = useState('')
  const [clientsSelect, setClientsSelect] = useState('')
      const [invoiceItem, setInvoiceItem] = useState([])
          const [prestation, setPrestation] = useState('')
          const [coutUnitaire, setCoutUnitaire] = useState(0)
          const [houre, setHoure] = useState('')
          const [description, setDescription] = useState('')
          const [totalunitaire, setTotalunitaire] = useState(0)

          // console.log(invoiceItem)


  // ** Hook
  const theme = useTheme()

  // ** Deletes form
  const deleteForm = e => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  // ** Handle Invoice To Change
  const handleInvoiceChange = event => {
    setClientsSelect(event.target.value)
    if (clients !== undefined) {
      setClientsSelect(clients.filter(i => i.name === event.target.value)[0])
    }
  }

  const handlePrestation = event => {
    setPrestation(event.target.value)
  }

  const handleCout = event => {
    setCoutUnitaire(parseInt(event.target.value))
  }

  const handleHoure = event => {
    setHoure(parseInt(event.target.value))
  }

  const handleDescription = event => {
    setDescription(event.target.value)
  }

  const handleAddItem = () => {
    setCount(count + 1)

    const totalU = coutUnitaire * houre
    console.log(totalU)
    setTotalunitaire(totalU)
      console.log(totalunitaire)
    setTimeout(() => {

    }, 1000);

    const itemContructor = {
      prestation,
      description,
      coutUnitaire,
      houre,
      totalunitaire
    }

    setInvoiceItem([...invoiceItem, itemContructor])

  }

  const handleAddNewCustomer = () => {
    toggleAddCustomerDrawer()
  }

  useEffect(() => {
    const fetchEntreprise = async () => {
      const res = await fetch('http://localhost:4003/api/clinic')
      const json = await res.json()

      if(res.ok) {
        setEntreprise(json[0])
      }
    }

    const fetchInvoices = async () => {
      const res = await fetch('http://localhost:4003/api/invoices')
      const json = await res.json()

      if(res.ok) {
        setFactures(json.length +1)
      }
    }

    const fetchclients = async () => {
      const res = await fetch('http://localhost:4003/api/clients')
      const json = await res.json()

      if(res.ok) {
        setClients(json)
      }
    }

    fetchEntreprise()
    fetchInvoices()
    fetchclients()
  }, [])

  return (
    <Card>
      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <svg width={34} height={23.375} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill={theme.palette.primary.main}
                    d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
                  />
                  <path
                    fill='#161616'
                    opacity={0.06}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
                  />
                  <path
                    fill='#161616'
                    opacity={0.06}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill={theme.palette.primary.main}
                    d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
                  />
                </svg>
                <Typography
                  variant='h6'
                  sx={{
                    ml: 2.5,
                    fontWeight: 600,
                    lineHeight: '24px',
                    fontSize: '1.375rem !important'
                  }}
                >
                  {entreprise.name}
                </Typography>
              </Box>
              <div>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>{entreprise.adress}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{entreprise.coordonnee}</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xl={6} xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ mr: 2, width: '105px' }}>
                  Invoice
                </Typography>
                <TextField
                  size='small'
                  sx={{ width: { sm: '250px', xs: '170px' } }}
                  InputProps={{
                    disabled: true,
                    startAdornment: <InputAdornment position='start'>#{factures < 100 && factures < 10 ? (`00${factures}`) : factures < 100 && factures >= 10 ? (`0${factures}`) : (factures)}</InputAdornment>
                  }}
                />
              </Box>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Date Issued:</Typography>
                <DatePicker
                  id='issue-date'
                  selected={issueDate}
                  customInput={<CustomInput />}
                  onChange={date => setIssueDate(date)}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Date Due:</Typography>
                <DatePicker
                  id='due-date'
                  selected={dueDate}
                  customInput={<CustomInput />}
                  onChange={date => setDueDate(date)}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
            <Typography sx={{ mb: 6, fontWeight: 500 }}>Invoice To:</Typography>
            <Select size='small' value={clientsSelect && clientsSelect.name} onChange={handleInvoiceChange} sx={{ mb: 4, width: '200px' }}>
              <CustomSelectItem value='' onClick={handleAddNewCustomer}>
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon icon='tabler:plus' fontSize='1.125rem' />
                  Add New Customer
                </Box>
              </CustomSelectItem>
              {clients &&
                clients.map(client => (
                  <MenuItem key={client.name} value={client.name}>
                    {client.name}
                  </MenuItem>
                ))}
            </Select>
            {clientsSelect !== null && clientsSelect !== undefined ? (
              <>
                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>{clientsSelect.company}</Typography>
                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>{clientsSelect.address}</Typography>
                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>{clientsSelect.contact}</Typography>
                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>{clientsSelect.companyEmail}</Typography>
              </>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
            <div>
              <Typography sx={{ mb: 6, fontWeight: 500 }}>Bill To: {clientsSelect.name}</Typography>
              <TableContainer>
                <Table>
                  <TableBody sx={{ '& .MuiTableCell-root': { py: `${theme.spacing(0.75)} !important` } }}>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>Total Due:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>12000 F</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>Bank name:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>{clientsSelect && clientsSelect.bank.bankName && clientsSelect.bank.bankName}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>Country:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>{clientsSelect && clientsSelect.bank.bankCountry}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>IBAN:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>{clientsSelect && clientsSelect.bank.bankCoordonnee}</Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <RepeaterWrapper>
        <Repeater count={count}>
          {i => {
            const Tag = i === 0 ? Box : Collapse

            // console.log(invoiceItem[i].totalunitaire)

            return (
              <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                <Grid container>
                  <RepeatingContent item xs={12}>
                    <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                      <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                          Item
                        </Typography>
                        <Select fullWidth size='small' defaultValue='App Design' onChange={handlePrestation}>
                          <MenuItem value='App Design'>App Design</MenuItem>
                          <MenuItem value='App Customization'>App Customization</MenuItem>
                          <MenuItem value='ABC Template'>ABC Template</MenuItem>
                          <MenuItem value='App Development'>App Development</MenuItem>
                        </Select>
                        <TextField
                          rows={2}
                          fullWidth
                          multiline
                          size='small'
                          sx={{ mt: 3.5 }}
                          onChange={handleDescription}
                        />
                      </Grid>
                      <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                          Cost
                        </Typography>
                        <TextField
                          size='small'
                          type='number'
                          placeholder='coût'
                          onChange={handleCout}
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                        <Box sx={{ mt: 3.5 }}>
                          <Typography component='span' sx={{ color: 'text.secondary' }}>
                            Discount:
                          </Typography>{' '}
                          <Typography component='span' sx={{ color: 'text.secondary' }}>
                            0%
                          </Typography>
                          <Tooltip title='Tax 1' placement='top'>
                            <Typography component='span' sx={{ mx: 2, color: 'text.secondary' }}>
                              0%
                            </Typography>
                          </Tooltip>
                          <Tooltip title='Tax 2' placement='top'>
                            <Typography component='span' sx={{ color: 'text.secondary' }}>
                              0%
                            </Typography>
                          </Tooltip>
                        </Box>
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                          Hours
                        </Typography>
                        <TextField
                          size='small'
                          type='number'
                          placeholder='1'
                          onChange={handleHoure}
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                      </Grid>
                      <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                        <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                          Price
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>${invoiceItem.totalunitaire}</Typography>
                      </Grid>
                    </Grid>
                    <InvoiceAction>
                      <IconButton size='small' onClick={deleteForm}>
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                      </IconButton>
                    </InvoiceAction>
                  </RepeatingContent>
                </Grid>
              </Tag>
            )
          }}
        </Repeater>

        <Grid container sx={{ mt: 4 }}>
          <Grid item xs={12} sx={{ px: 0 }}>
            <Button variant='contained' onClick={handleAddItem}>
              Add Item
            </Button>
          </Grid>
        </Grid>
      </RepeaterWrapper>

      <Divider />
      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2' sx={{ mr: 2, fontWeight: 600 }}>
                Salesperson:
              </Typography>
              <TextField size='small' sx={{ maxWidth: '150px' }} defaultValue='Tommy Shelby' />
            </Box>
            <TextField size='small' sx={{ maxWidth: '300px' }} placeholder='Thanks for your business' />
          </Grid>
          <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Subtotal:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>$1800</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Discount:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>$28</Typography>
            </CalcWrapper>
            <CalcWrapper sx={{ mb: '0 !important' }}>
              <Typography sx={{ color: 'text.secondary' }}>Tax:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>21%</Typography>
            </CalcWrapper>
            <Divider sx={{ my: `${theme.spacing(2)} !important` }} />
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Total:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>$1690</Typography>
            </CalcWrapper>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent sx={{ px: [6, 10] }}>
        <InputLabel htmlFor='invoice-note' sx={{ mb: 2, fontWeight: 500, fontSize: '0.875rem' }}>
          Note:
        </InputLabel>
        <TextField
          rows={2}
          fullWidth
          multiline
          id='invoice-note'
          defaultValue='It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'
        />
      </CardContent>
    </Card>
  )
}

export default AddCard
