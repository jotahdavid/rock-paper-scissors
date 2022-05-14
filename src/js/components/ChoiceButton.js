import createElement from '../utils/createElement.js';

export default function ChoiceButton({ value, animation = 'appear-and-rotate', playerClass, onClick }) {
  return (
    createElement('button',
      {
        className: playerClass ? `choices ${playerClass}` : 'choices',
        'data-choice': value,
        'data-animation': animation,
        onClick
      },
      createElement('img',
        {
          src: `./src/images/emoji/${value.toLowerCase()}.png`,
          alt: `${value} emoji`
        },
      ),
      createElement('span', { className: 'tooltip' }, value),
    )
  );
}
