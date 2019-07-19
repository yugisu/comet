// import { bindActionCreators } from 'redux';
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { StoreState } from '~store/types';
// import { editMessage } from '~store/messages/actions';
// import { useLockBodyScroll } from '~hooks/use-lock-body.hook';

// import './style.scss';

// export function MessageModal() {
//   const [text, setText] = useState(openedMessage ? openedMessage.message : '');

//   useEffect(() => {
//     if (openedMessage) setText(openedMessage.message);
//   }, [openedMessage]);

//   useLockBodyScroll(!!openedMessage);

//   if (!openedMessage) return null;

//   const closeModal = () => a.toggleEditingMessage();
//   const onBGClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
//     const target = e.target as HTMLElement;
//     if (target.classList.contains('modal-wrapper')) closeModal();
//   };

//   const onTextInput = (e: React.ChangeEvent) => {
//     const target = e.target as HTMLInputElement;
//     setText(target.value);
//   };

//   const onSubmit = () => {
//     a.editMessage(openedMessage.id, text);
//     closeModal();
//   };

//   return (
//     <div className='modal-wrapper' onClick={onBGClick} aria-hidden>
//       <div className='modal'>
//         <header className='modal__header'>
//           <h2>Edit message</h2>
//         </header>
//         <div className='modal__content'>
//           <textarea
//             className='modal__text'
//             value={text}
//             onChange={onTextInput}
//             rows={10}
//           />
//           <button className='modal__close' onClick={closeModal}>
//             <span role='img' aria-hidden>
//               ❌
//             </span>
//           </button>
//           <button className='modal__submit' onClick={onSubmit}>
//             <span>Submit</span>{' '}
//             <span role='img' aria-hidden>
//               ✔️
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
