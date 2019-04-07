
@WebServlet("/Connect")
public class Connection extends HttpServlet{
  private static final long serialVersionUID = 1L;
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException{
    Connection conn = null;
    PreparedStatement st = null;
    ResultSet rs = null;

    try{
      Class.forName("");
      conn = DriverManager.getConnection("");
      st = conn
    }

  }
  protected void doPost(HttpServletRequest request, HttpServletResponse response){
    doGet(request, response);
  }
}
