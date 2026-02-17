import React, { useState } from 'react';
import * as bootstrap from 'bootstrap';

export default function ProductModal() {

	const  OpenModal = (id:string) => {

		const el = document.getElementById(id);

		if (el) {
			const modal = bootstrap.Modal.getOrCreateInstance(el);

			modal.show();
		} else {
			return;
		}

    }

    const CloseModal = (id: string) => {


        const el = document.getElementById(id);

        if (el) {
            const modal = bootstrap.Modal.getOrCreateInstance(el);

            modal.hide();
        } else {
            return;
        }

    }

    const AddCart = (id:string) => {
        const el = document.getElementById(id);

        if (el) {
            const modal = bootstrap.Modal.getOrCreateInstance(el);
            alert('商品がカートに追加されました！');
            modal.hide();
        } else {
            return;
        }
    }

	return (
		<div>
			<button id={'open-modal-btn'} className={'btn btn-info'} onClick={() => OpenModal('product-modal')} >商品詳細を見る</button>

            <div id={"product-modal"} className="modal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">商品詳細</h5>
                            <button type={"button"} className="close" data-dismiss={"modal"} aria-label={"Close"} onClick={() => CloseModal('product-modal')}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>ここに商品詳細コンテンツが入ります。</p>
                            <p>商品名: 最新ガジェットX</p>
                            <p>価格: 99,800円</p>
                        </div>
                        <div className="modal-footer">
                            <button type={"button"} className="btn btn-secondary" data-dismiss={"modal"} onClick={() => CloseModal('product-modal')} >閉じる</button>
                            <button type={"button"} className="btn btn-primary" id={"add-to-cart-btn"} onClick={() => AddCart('product-modal') } >カートに入れる</button>
                        </div>
                    </div>
                </div>
            </div>

		</div>
	);

}