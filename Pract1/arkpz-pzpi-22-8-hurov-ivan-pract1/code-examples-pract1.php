// Код до застосування рекомендацій
// До рефакторингу
class Car {
    // Назва автомобіля
    String $name;

    // Чи є у автомобіля колеса?
    bool $hasWheels = false;

    // Чи є у автомобіля двигун?
    bool $hasEngine = false;

    // Чи є у автомобіля кузов?
    bool $hasBody = false;

    function __construct($name) {
        // Призначаємо назву
        $this->name = $name;
    }
}

function assembleCar($car) {
    echo "Starting assembly of $car->name";
    $car->hasBody = true;
    echo "Body is attached.";
    $car->hasEngine = true;
    echo "Engine is installed.";
    $car->hasWheels = true;
    echo "Wheels are installed.";
    echo "$car->name is assembled.";
}

// Після рефакторингу
class Car {
    String $name;
    bool $hasWheels = false;
    bool $hasEngine = false;
    bool $hasBody = false;

    function __construct($name) {
        $this->name = $name; // Встановлюємо ім'я автомобіля
    }

    // Починаємо процес збирання автомобіля
    function assemble() {
        echo "Starting assembly of $this->name";
        $this->addBody();  // Додаємо кузов
        $this->attachEngine();  // Встановлюємо двигун
        $this->installWheels();  // Встановлюємо колеса
        echo "$this->name is assembled";  // Повідомляємо про завершення
    }

    function addBody() {
        $this->hasBody = true;
        echo "Body is attached";
    }

    function attachEngine() {
        $this->hasEngine = true;
        echo "Engine is installed";
    }

    function installWheels() {
        $this->hasWheels = true;
        echo "Wheels are installed";
    }
}

$car = new Car("NiceCar");
$car->assemble();

