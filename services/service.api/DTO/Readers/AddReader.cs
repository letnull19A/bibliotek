namespace Service.API.DTO.Readers;

public sealed class AddReader 
{
    private readonly string _name;
    private readonly string _surname;
    private readonly string _fatherName;
    private readonly string _address;
    private readonly string _phone;

    public AddReader(string name, string surname, string fatherName, string address, string phone) 
        => (_name, _surname, _fatherName, _address, _phone) = (name, surname, fatherName, address, phone);
    
    public string Name { get => _name; }
    public string Surname { get => _surname; }
    public string FatherName { get => _fatherName; }
    public string Address { get => _address; }
    public string Phone { get => _phone; }
}