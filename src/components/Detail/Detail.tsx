import { Rating } from '@material-ui/lab';
import styles from './Detail.module.css';
import BarCode from '../BarCode/BarCode';
import notFound from '../../resources/image-not-found.png';
import { Grid, Box, Chip, Button } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { AcUnit, Receipt, LocalOffer, LocalMall } from '@material-ui/icons';

const Detail = (props: any) => {
  return (
    <div className={styles.content}>
        <Grid container justify="flex-start">
            <Box style={{ width: '100%' }} marginLeft={1} my={0}>

                <Button style={{ marginTop: '5px' }} variant="outlined" color="secondary" onClick={() => props.handleProduct(null)}>Volver</Button>

                <div className={styles.info}>

                    <img style={{ width: 300, height: 175, marginTop: '10px' }} alt={props.product.name} src={notFound} />
                        
                    <div className={styles.view_text}><strong>Nombre:</strong> {props.product.name}</div>
                    <div className={styles.view_text}><strong>Nombre del Laboratorio/Proveedor:</strong> {props.product.lab_provider_name}</div>
                    <div className={styles.view_text}><strong>Precio $:</strong> { props.fix(props.product.price) }</div>
                    <div className={styles.view_text}><strong>Precio Bs:</strong> { props.fix(Number(props.exchange.amount) * (props.product.price)) }</div>
                    <div className={styles.view_text}><Rating name="read-only" value={props.product.rating} readOnly /></div>
                        
                    <div>
                        <Chip className={styles.chip} color="primary" label={(props.product.freeze===1)?'Refrigerado':'No Refrigerado'} icon={<AcUnit />} />
                        <Chip className={styles.chip} color="primary" label={(props.product.regulated===1)?'Regulado':'No Regulado'} icon={<LocalMall />} />
                        <Chip className={styles.chip} color="primary" label={(props.product.tax===1)?'Libre de Impuestos':'No es Libre de Impuestos'} icon={<MonetizationOnIcon />} />
                        <Chip className={styles.chip} color="primary" label={(props.product.recipe===1)?'Con Recipe':'Sin Recipe'} icon={<Receipt />} />
                        <Chip className={styles.chip} color="primary" label={(props.product.replacement_classification==='A') ? 'Clasificación A' : (props.product.replacementClassification==='B') ? 'Clasificación B' : 'Clasificación C'} icon={<LocalOffer />} />
                    </div>
                
                    <BarCode value={props.product.codebar} />
                </div>

            </Box>
        </Grid>
    </div>
  );
};

export default Detail;