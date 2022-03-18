def main(message):
    res=""
    for i in range(len(message)):
        for j in range(len(message), i, -1):
            if len(res) >= j-i:
                break
            elif message[i:j] == message[i:j][::-1]:
                res = message[i:j]
    if len(res)<2:
        print("Исходное сообщение:",message)
        print("Палиндромов нет")
    else:
        print("Исходное сообщение:",message)
        print("Самый длинный палиндром:",res)
def test_case1():
    m="Шалаш,привет,как"
    main(m.lower())
def test_case2():
    m="Наворован,шалаш,привет"
    main(m.lower())
def test_case3():
    m="привет,пока,почему"
    main(m.lower())
while True:
    print("1-test_case1")
    print("2-test_case2")
    print("3-test_case3")
    n = int(input("Введите номер тест кейса:"))
    if n==1:
        test_case1()
    elif n==2:
        test_case2()
    elif n==3:
        test_case3()
