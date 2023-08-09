#a really early attempt at making a hangman game. 
secretword = input(" Write the word to guess!")
secretword = secretword.lower()

for i in range(100):
    print(" ")

display = []
used = []

display.extend(secretword)
used.extend(display)

for i in range(len(display)):
    display[i] = "_"
print(" ".join(display))

count = 0
tries = 5

while count < len(secretword) and tries > 0:
    guess = input("Guess a letter")

    for i in range(100):
        print(" ")

    for i in range(len(secretword)):
        if secretword[i] == guess and guess in used:
            display[i] = guess
            count = count + 1
            used.remove(guess)

    if guess not in display:
        tries = tries - 1
        print("Wrong!")

    print("you have guessed", count, "letters correct!")
    print("you have", tries, "tries left")

    print(" ".join(display))

if count == len(secretword):
    print("You win!")

else:
    print("You lose!")