import styles from './ListItems.module.css';
import { Skeleton, Rating } from '@material-ui/lab';
import { Grid, Box, Typography, TablePagination } from '@material-ui/core';
import notFound from '../../resources/image-not-found.png';

const ListItems = (props: any) => {
  return (
    <div className={styles.content}>
        <Grid container justify='space-evenly' className={styles.boxes}>
            {(!props.notfound) ? null :
                <Box color="text.secondary" pr={2}>
                    <Typography gutterBottom variant="body1" >
                        Producto no encontrado.
                    </Typography>
                </Box>}
            {(!props.loading ? Array.from(new Array(4)) : props.products).map((item: any, index: number) => (
                <Box key={index} width={260} marginRight={1} my={0.5}>
                {item ? (
                    <img style={{ width: 260, height: 145 }} alt={item.name} src={notFound} onClick={() => props.handleProduct(item)}/>
                ) : (
                     <Skeleton variant="rect" width={260} height={145} /> 
                )}

                {item ? (
                    <Box pr={2}>
                        <Typography gutterBottom variant="body1" >
                            {item.name}
                        </Typography>
                        <Typography display="block" variant="body2" color="textSecondary">
                            Precio: $ { props.fix(item.price) }
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <Rating name="read-only" value={item.rating} readOnly />
                        </Typography>
                    </Box>
                ) : (
                    <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="60%" />
                    </Box>
                )}
                </Box> 
                
                    
            ))}
            </Grid>

            <TablePagination
                className={styles.pagination}
                component="div"
                count={props.pages}
                page={props.page}
                onChangePage={props.handleChangePage}
                rowsPerPageOptions={[]}
                rowsPerPage={5}
                />
    </div>
  );
};

export default ListItems;
