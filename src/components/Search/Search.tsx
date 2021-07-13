import styles from './Search.module.css';
import { Clear, Search } from '@material-ui/icons';
/* import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus'; */
import scan from '../../resources/scan.png' 
import {FormControl, IconButton, Input, InputLabel, InputAdornment} from '@material-ui/core';

const SearchInput = (props: any) => {
  return (
    <div className={styles.content}>
        <FormControl className={styles.search} size="small" variant="outlined">
            <InputLabel htmlFor="" className={styles.label_input}>Buscar</InputLabel>
            <Input
                className={styles.input}
                value={props.text}
                onChange={props.handleTextChange}
                endAdornment={
                <InputAdornment position='start'>
                    { (props.text === '') ? <IconButton aria-label=''><Search /> </IconButton> : 
                    <IconButton aria-label='' onClick={props.handleClearText} ><Clear /></IconButton> }
                    <img src={scan} width='20' onClick={props.openScanner}></img>
                    {/* <FilterCenterFocusIcon onClick={props.openScanner}/> */}
                </InputAdornment>
                }
            />
            
        </FormControl>
    </div>
  );
};

export default SearchInput;
