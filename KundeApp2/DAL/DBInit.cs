using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using KundeApp2.DAL;

namespace KundeApp2.Model
{
    public static class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            var serviceScope = app.ApplicationServices.CreateScope();
           
            var db = serviceScope.ServiceProvider.GetService<KundeContext>();

            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();

            var poststed1 = new Poststeder {Postnr = "0270", Poststed = "Oslo"};
            var poststed2 = new Poststeder {Postnr = "1370", Poststed = "Asker"};

            var kunde1 = new Kunder { Fornavn = "Ole", Etternavn = "Hansen", Adresse = "Olsloveien 82", Poststed = poststed1};
            var kunde2 = new Kunder { Fornavn = "Line", Etternavn = "Jensen", Adresse = "Askerveien 72", Poststed = poststed2 };

            db.Kunder.Add(kunde1);
            db.Kunder.Add(kunde2);

            // lag en påoggingsbruker
            var bruker = new Brukere();
            bruker.Brukernavn = "Admin";
            string passord = "Test11";
            byte[] salt = KundeRepository.LagSalt();
            byte[] hash = KundeRepository.LagHash(passord, salt);
            bruker.Passord = hash;
            bruker.Salt = salt;
            db.Brukere.Add(bruker);

            db.SaveChanges();
        }
    }
       
}
