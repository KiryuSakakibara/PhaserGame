import { RopeJoint } from "planck";
import { CharacterName } from "../../Plugins/Dialogue/CharacterNames";
import { Dialogue } from "../../Plugins/Dialogue/Dialogue";
const LOTUS = CharacterName.LOTUS
const ROKA = CharacterName.ROKA

export const BeginningDialogue: Dialogue[] = [
    {
        id: 1,
        char: LOTUS,
        txt: "Roka!? Is that you?",
        next: 2
    },
    {
        id: 2,
        char: ROKA,
        txt: "What?",
        next: 3
    },
    {
        id: 3,
        char: LOTUS,
        txt: "You- you're alive!",
        next: 4
    },
    {
        id: 4,
        char: ROKA,
        txt: "Um, yea?",
        next: 5
    },
    {
        id: 5,
        char: ROKA,
        txt: "Why wouldn't I be?",
        next: 6
    },
    {
        id: 6,
        char: LOTUS,
        txt: "Where am I? No, when am I?",
        next: 7
    },
    {
        id: 7,
        char: LOTUS,
        txt: "And why can't I move my body?",
        next: 10
    },
    {
        id: 10,
        char: ROKA,
        txt: "Lotus calm down, is everything okay?",
        next: 11
    },
    {
        id: 11,
        char: LOTUS,
        txt: "But you-",
        next: 12
    },
    {
        id: 12,
        char: LOTUS,
        txt: "How-",
        next: 13
    },
    {
        id: 13,
        char: LOTUS,
        txt: "...",
        next: 14
    },
    {
        id: 14,
        char: LOTUS,
        txt: "*Inhale*",
        next: 15
    }, 
    {
        id: 15,
        char: LOTUS,
        txt: "*Exhale*",
        next: 16
    },
    {
        id: 16,
        char: LOTUS,
        txt: "...",
        next: 18
    },
    {
        id: 18,
        char: LOTUS,
        txt: "I'm okay, sorry.",
        next: 19
    },
    {
        id: 19,
        char: LOTUS,
        txt: "I think I know what's going on.",
        next: 20
    },
    {
        id: 20,
        char: LOTUS,
        txt: "What's today's date?"
        ,
        next: 21
    },
    {
        id: 21,
        char: ROKA,
        txt: "//TODO: insert date",
        next: 22
    },
    {
        id: 22,
        char: LOTUS,
        txt: "Well of course it is.",
        next: 23
    },
    {
        id: 23,
        char: ROKA,
        txt: "So, uh, why do you sound like a time traveler?",
        next: 24
    },
    {
        id: 24,
        char: LOTUS,
        txt: "Oh, that's...",
        next: 25
    },
    {
        id: 25,
        char: LOTUS,
        txt: "Because I am?",
        next: 26
    },
    {
        id: 26,
        char: ROKA,
        txt: "What!? You got time traveling powers in the future?",
        next: 27
    },
    {
        id: 27,
        char: LOTUS,
        txt: "It's, well...",
        next: 28
    },
    {
        id: 28,
        char: LOTUS,
        txt: "more like a curse...",
        next: 29
    },
    {
        id: 29,
        char: ROKA,
        txt: "What do you mean? Isn't time travel cool?",
        next: 30
    },
    {
        id: 30,
        char: LOTUS,
        txt: "...",
        next: 31
    },
    {
        id: 31,
        char: ROKA,
        txt: "Lotus?",
        next: 32
    },
    {
        id: 32,
        char: LOTUS,
        txt: "Sorry, it's just...",
        next: 33
    },
    {
        id: 33,
        char: LOTUS,
        txt: "A lot's happened since I last spoke to you.",
        next: 34
    },
    {
        id: 34,
        char: ROKA,
        txt: "What?",
        next: 360
    },
    {
        id: 360,
        char: ROKA,
        txt: "Did something happen between us?",
        next: 365
    },
    {
        id: 365,
        char: LOTUS,
        txt: "...",
        next: 370
    },
    {
        id: 370,
        char: ROKA,
        txt: "Are you trying to fix things by going back in time?",
        next: 380
    },
    {
        id: 380,
        char: LOTUS,
        txt: "...",
        next: 390
    },
    {
        id: 390,
        char: ROKA,
        txt: "Wouldn't this create some kind of paradox? Like-",
        next: 400
    },
    {
        id: 400,
        char: LOTUS,
        txt: "Can you just shut up for like, one second?",
        next: 410
    },
    {
        id: 410,
        char: ROKA,
        txt: "O-oh...",
        next: 420
    },
    {
        id: 420,
        char: LOTUS,
        txt: "Look, I'm just as confused as you are.",
        next: 430
    },
    {
        id: 430,
        char: LOTUS,
        txt: "I don't know how any of this time travel stuff works, it just happens.",
        next: 440
    },
    {
        id: 440,
        char: LOTUS,
        txt: "I don't even know why I'm here!",
        next: 450
    },
    {
        id: 450,
        char: LOTUS,
        txt: "There has to be something special about this point in time considering the broken state the world.",
        next: 460
    },
    {
        id: 460,
        char: LOTUS,
        txt: "Roka, what were you doing before I came here?",
        next: 470
    },
    {
        id: 470,
        char: ROKA,
        txt: "...",
        next: 480
    },
    {
        id: 480,
        char: LOTUS,
        txt: "*sigh*",
        next: 490
    },
    {
        id: 490,
        char: LOTUS,
        txt: "Sorry I told you to shut up.",
        next: 500
    },
    {
        id: 500,
        char: LOTUS,
        txt: "It's just, after everything that's happened, I'm not the same person you knew.",
        next: 510
    },
    {
        id: 510,
        char: LOTUS,
        txt: "Everything's become a lot more meaningless to me...",
        next: 520
    },
    {
        id: 520,
        char: LOTUS,
        txt: "So, sorry if it seems like I don't like you anymore.",
        next: 530
    },
    {
        id: 530,
        char: ROKA,
        txt: "...I guess I kind of understand.",
        next: 540
    },
    {
        id: 540,
        char: ROKA,
        txt: "I-if you still want to know what I was just doing, I was talking to you about superintelligent AI.",
        next: 550
    },
    {
        id: 550,
        char: LOTUS,
        txt: "I see...",
        next: 560
    },
    {
        id: 560,
        char: LOTUS,
        txt: "Yea, I think I remember having this conversation with you.",
        next: 570
    },
    {
        id: 570,
        char: LOTUS,
        txt: "...",
        next: 580
    },
    {
        id: 580,
        char: LOTUS,
        txt: "Actually, the more I think about it, the more I feel like this is all your fault.",
        next: 590
    },
    {
        id: 590,
        char: ROKA,
        txt: "W-what?",
        next: 600
    },
    {
        id: 600,
        char: LOTUS,
        txt: "You spoke to me about the superintelligent AI without warning me, fully knowing that it was an information hazard.",
        next: 610
    },
    {
        id: 610,
        char: LOTUS,
        txt: "If you never told me about it, I wouldn't be in this situation!",
        next: 620
    },
    {
        id: 620,
        char: ROKA,
        txt: "W-wait, Lotus, I have no idea what you're talking about...",
        next: 630
    },
    {
        id: 630,
        char: LOTUS,
        txt: "...",
        next: 640
    },
    {
        id: 640,
        char: LOTUS,
        txt: "No, that's a dumb way of thinking, my bad.",
        next: 650
    },
    {
        id: 650,
        char: LOTUS,
        txt: "I made my choice not to take it seriously, and that's still how I feel.",
        next: 660
    },
    {
        id: 660,
        char: LOTUS,
        txt: "I guess after all this time, my stance on moral dilemmas hasn't changed.",
        next: 670
    },
    {
        id: 670,
        char: ROKA,
        txt: "Your stance on moral dilemmas?",
        next: 680
    },
    {
        id: 680,
        char: ROKA,
        txt: "If I remember right, you said most moral dilemmas are stupid and not worth thinking about, right?",
        next: 690
    },
    {
        id: 690,
        char: ROKA,
        txt: "And that nothing is actually being tested, since the creator of the situation is objectively the most immoral?"
    }
]