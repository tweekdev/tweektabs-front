import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UsersList.css';

function customCheckbox(theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.type === 'light' ? '#1c204c' : '#1c204c'
      }`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1c204c',
      borderColor: '#1c204c',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #1c204c',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1c204c',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  };
}
function CustomPagination(props) {
  const { state, api } = props;

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={state.pagination.page}
      count={state.pagination.pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => api.current.setPage(value)}
    />
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    backgroundColor: '#1c204c',
    color: '#f8f8fa',
    fontFamily: ['Roboto'].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#1c204c',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.type === 'light' ? '#1c204c' : '#1c204c'
      }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.type === 'light' ? '#1d2761' : '#1d2761'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color: '#f8f8fa',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    ...customCheckbox(theme),
  },
}));
const UsersList = (props) => {
  const classes = useStyles();
  const [data, setdata] = useState([]);

  CustomPagination.propTypes = {
    /**
     * ApiRef that let you manipulate the grid.
     */
    api: PropTypes.shape({
      current: PropTypes.object.isRequired,
    }).isRequired,
    /**
     * The GridState object containing the current grid state.
     */
    state: PropTypes.object.isRequired,
  };

  const columns: ColDef[] = [
    {
      field: 'pseudo',
      headerName: 'pseudo',
      width: 240,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'name',
      headerName: 'name',
      width: 250,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'firstname',
      headerName: 'firstname',
      width: 250,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'email',
      headerName: 'email',
      width: 250,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'role',
      headerName: 'role',
      width: 100,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: function (params: role) {
        if (params.value === 'user') {
          //mark police cells as red
          return ` easy-admin`;
        } else if (params.value === 'admin') {
          return ` hard-admin`;
        }
        return null;
      },
    },
    {
      field: 'countTabs',
      headerName: 'Tabs',
      width: 70,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'countTutorials',
      headerName: 'Tutorials',
      width: 70,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'id',
      headerName: 'Actions',
      renderCell: (params: id) => (
        <strong className="actions-adm">
          <div className="users-item__actions">
            <Link to={`/users/edit/${params.value}`}>
              <button className="act">
                <EditIcon></EditIcon>
              </button>
            </Link>
          </div>
        </strong>
      ),
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      cellClassName: 'super-app-theme--cell',
    },
  ];

  useEffect(() => {
    props.users.map((user) =>
      setdata((arr) => [
        ...arr,
        {
          id: user.id,
          pseudo: user.pseudo,
          name: user.name,
          firstname: user.firstname,
          email: user.email,
          role: user.role[0].name,
          countTabs: user.tabs.length,
          countTutorials: user.tutorials.length,
        },
      ])
    );
  }, [props.users]);
  return (
    <div className="users-content-admin">
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={classes.root} style={{ height: 520, width: '100%' }}>
          <DataGrid
            className={classes.root}
            rows={data}
            columns={columns}
            showToolbar
            pageSize={10}
            autoHeight
            rowHeight={38}
            loading={data.length === 0}
            columnBuffer={2}
            components={{
              Toolbar: GridToolbar,
              Pagination: CustomPagination,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersList;
