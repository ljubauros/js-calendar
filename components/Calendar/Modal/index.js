import styles from "./modal.module.css";

const Modal = ({ onClose }) => {
	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => {e.stopPropagation()}}>
				<div className={styles.title}>Novi dogadjaj</div>
				<form>
                    <br/>
					<div>
						<label>Naslov: </label>
						<input type="text" placeholder="Unesite naslov" />
					</div>
					<br />
					<div>
						<label>Opis: </label>
						<textarea
							type="text"
							placeholder="Unesite opis"
						></textarea>
					</div>
					<br />
					<div>
						<label>Vreme: </label>
						<input type="text" placeholder="Unesite vreme" />
					</div>
                    <br/>
					<div>
                        <label>Izaberite ucesnike: </label>
						<select multiple>
							<option value="1">Pera</option>
							<option value="2">Mika</option>
							<option value="3">Zika</option>
						</select>
					</div>
                    <br/>
					<button type="button" className="button">Dodaj</button>
				</form>
			</div>
		</div>
	);
};

export default Modal;
