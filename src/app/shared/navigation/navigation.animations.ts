import { animate, state, style, transition, trigger, sequence } from '@angular/animations';

const createBurgerTrigger = (
    name: string, // Trigger name
    yOff: number, // Y translation
    angl: number, // Rotation angle
    speed: number // Animation speed
) => {
    return trigger(name, [
        // Dead center, rotated +deg
        state('open', style({
            transform: `translate(-50%, -50%) rotate(${angl}deg)`
        })),

        // Offset from center, rotated 0deg
        state('closed', style({
            transform: `translate(-50%, calc(-50% + ${yOff}em)) rotate(0deg)`
        })),

        transition('closed <=> open', [
            sequence([
                // Bring to center first
                animate(`${speed/2}ms cubic-bezier(0.04, 0.04, 0.12, 0.96)`, style({
                    transform: 'translate(-50%, -50%)'
                })),

                // then rotate
                animate(`${speed/2}ms cubic-bezier(0.04, 0.04, 0.12, 0.96)`)
            ])
        ])
    ])
}

export const burgerAnimations = (
    speed: number // Animation speed
) => [
    createBurgerTrigger('burgerTop', -0.2, 45, speed),
    createBurgerTrigger('burgerBottom', 0.2, -45, speed)
]

export const contentAnimations = (speed: number) => [
    trigger('content', [
        // Fully expanded height
        state('open', style({
            display: 'flex',
            height: 'calc(var(--vh) * 100 - 2.8em)'
        })),

        // No height, not rendered
        state('closed', style({
            height: 0,
            display: 'none'
        })),

        transition('closed => open', [
            sequence([
                // Render first, so visual properties are transitionable
                style({ display: 'flex' }),

                // then animate height
                animate(`${speed}ms`)
            ])
        ]),

        transition('open => closed', [
            sequence([
                // Revert back to 0 height
                animate(`${speed}ms`, style({ height: 0 })),
            ])
        ])
    ])
]