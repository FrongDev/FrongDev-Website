export default `import random
import time
player_score = 0
def rps_game():
    global player_score
    random.seed()
    bowser_choice = random.randint(1,3)
    player_choice = input("What do you choose? 1 for rock, 2 for paper, 3 for scissors? ")
    if player_choice == str(bowser_choice):
        input("Looks like y'all tied, go again.")
        rps_game()
    elif (player_choice == "1") and (bowser_choice == 2):
        input("""       You chose rock
        Bowzer chose paper
        Looks like Bowzer wins this one.""")
    elif (player_choice == "1") and (bowser_choice == 3):
        input("""       You chose rock
        Bowzer chose scissors
        Poggers you win this one!""")
        player_score += 1
    elif (player_choice == "2") and (bowser_choice == 1):
        input("""       You chose paper
        Bowzer chose rock
        Poggers you win this one!""")
        player_score += 1
    elif (player_choice == "2") and (bowser_choice == 3):
        input("""       You chose paper
        Bowzer chose scissors
        Looks like Bowzer wins this one.""")
    elif (player_choice == "3") and (bowser_choice == 1):
        input("""       You chose scissors
        Bowzer chose rock
        Looks like Bowzer wins this one.""")
    elif (player_choice == "3") and (bowser_choice == 2):
        input("""       You chose scissors
        Bowzer chose paper
        Poggers you win this one!""")
        player_score += 1
    else:
        print("invalid input")
        rps_game()
def trivia_game():
    global player_score
    random.seed()
    bowser_triv = random.randint(1,3)
    if bowser_triv == 1:
        print("One of Bowzer's kids became a streamer, finish his legendary intro:")
        triv_one = input("Alright boys, today the plan is ")
        if triv_one == "simple":
            input("You got it! But do you know when your prime cooldown ends?")
            player_score += 1
        else:
            input("Nope, the plan is simple. Sadge.")
    elif bowser_triv == 2:
        triv_two = input("Of all the Super Mario games in 3D, which is objectively the best? Super Mario: ")
        if triv_two.lower() == "galaxy":
            input("Based, I knew you would make the right choice.")
            player_score += 1
        else:
            input("Wrong. I am unbelievably disappointed in you.")
    elif bowser_triv == 3:
        triv_three = input("How many chaos emeralds do you need to go Super Sonic? ")
        if triv_three == "7":
            input("You play sonic games? Cringe.")
            player_score += 1
        else:
            input("Honestly, I'm glad you got this wrong. All my homies hate sonic in smash, take a point.")
            player_score += 1
def fight_game():
    print("There is only one way to defeat Bowzer in an all out brawl, and that's yeeting him.")
    input("When he turn's his back be ready to grab him by the tail")
    def throw_one():
        input("Quick his back is turned, now is your chance!")
        print("")
        t0 = time.time()
        grab1 = input("You have 5 seconds to type 'grab':")
        t1 = time.time()
        if (t1 - t0) <= 5 and grab1.lower() == "grab":
            print("")
            input("Nice! You grab Bowzer's tail and start to spin, hopefully you land your throw.")
            random.seed()
            yeet = random.randint(1,3)
            if yeet == 3:
                input("You miss the throw and Bowzer leaps back on stage. You better try again.")
                throw_one()
            else:
                input("Bowzer smashes into the bomb! Only two throws to go!")
                throw_two()
        else:
            print("")
            input("You're too slow!")
    def throw_two():
        input("Quick his back is turned, now is your chance!")
        print("")
        t0 = time.time()
        grab1 = input("You have 5 seconds to type 'dash grab':")
        t1 = time.time()
        if (t1 - t0) <= 5 and grab1.lower() == "dash grab":
            print("")
            input("Nice! You grab Bowzer's tail and start to spin, hopefully you land your throw.")
            random.seed()
            yeet = random.randint(1,3)
            if yeet == 3:
                input("You miss the throw and Bowzer leaps back on stage. Bit of a choke.")
                throw_two()
            else:
                input("Bowzer smashes into the bomb! Only one throw left!")
                throw_three()
        else:
            print("")
            input("You're too slow!")
    def throw_three():
        input("Quick his back is turned, now is your chance!")
        print("")
        t0 = time.time()
        grab1 = input("You have 5 seconds to type 'dash grab spin':")
        t1 = time.time()
        if (t1 - t0) <= 5 and grab1.lower() == "dash grab spin":
            print("")
            input("Nice! You grab Bowzer's tail and start to spin, hopefully you land your throw.")
            random.seed()
            yeet = random.randint(1,3)
            if yeet == 3:
                input("You miss the throw and Bowzer leaps back on stage. Looks like you won't pb this run.")
                throw_three()
            else:
                input("Epic! you take down Bowzer in this battle!")
                global player_score
                player_score += 1
        else:
            print("")
            input("You're too slow!")
    throw_one()

input("Oh no! Your princess has been stolen by an ugly turtle! You need to save her, it's the kingdoms only hope!")
input("In order to save Peech you must go head to head with Bowzer in an all out best of three battle!")
order = [1, 2, 3]
random.seed()
random.shuffle(order)
def game(round):
    if order[round] == 1:
        print("")
        print("Bowzer challenges you to a rock paper scissors showdown!")
        rps_game()
    elif order[round] == 2:
        print("")
        print("Bowzer attacks you with trivia!")
        trivia_game()
    elif order[round] == 3:
        print("")
        print("Bowzer wants to fight N64 style!")
        fight_game()
game(0)
game(1)
game(2)
print("")
print("You've completed all of Bowzer's challenges, good job! Lets see if you did well enough to save the princess.")
if player_score >= 2:
    input("Drumroll please......")
    print("")
    input("Looks like you won the best of 3! PogChamp!")
    input("Now you can go give Peech a big ol smooch and live happily ever after :)")
    print("")
    print("Thanks for playing!")
    input("This production was brought to you by frong.")
    print("")
    input("Until next time!")
    quit()
else:
    input("Drumroll please......")
    print("")
    input("Looks like Bowzer handed you a beating and stole your girl, feelsbadman.")
    input("Welp, better luck next time! There's always more fish in the sea.")
    print("")
    print("Thanks for playing!")
    input("This production was brought to you by frong.")
    print("")
    input("Until next time!")
    quit()`;
